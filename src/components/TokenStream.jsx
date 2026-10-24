import { useEffect, useRef, useState } from 'react'

const SEQUENCE = ['我', '爱', '自然', '语言', '处理', '，', '更', '爱', '写', '代码', '。']
const CANDIDATES = [
  { token: '处理', alts: ['学习', '处理', '翻译'], p: 0.87 },
  { token: '语言', alts: ['语言', '世界', '生活'], p: 0.93 },
  { token: '处理', alts: ['处理', '计算', '理解'], p: 0.91 },
  { token: '，', alts: ['，', '、', '!'], p: 0.96 },
  { token: '更', alts: ['更', '也', '不'], p: 0.72 },
  { token: '爱', alts: ['爱', '想', '怕'], p: 0.95 },
  { token: '写', alts: ['写', '读', '改'], p: 0.81 },
  { token: '代码', alts: ['代码', '文档', 'BUG'], p: 0.89 },
  { token: '。', alts: ['。', '！', '~'], p: 0.97 },
]

/**
 * LLM 逐 token 生成动画：模拟 next-token prediction 的自回归循环。
 */
export default function TokenStream() {
  const [shown, setShown] = useState(['我', '爱', '自然'])
  const [current, setCurrent] = useState(null)
  const [running, setRunning] = useState(false)
  const stepRef = useRef(0)
  const timerRef = useRef(null)

  const start = () => {
    if (running) return
    if (stepRef.current >= CANDIDATES.length) {
      stepRef.current = 0
      setShown(['我', '爱', '自然'])
    }
    setRunning(true)
    tick()
  }

  const tick = () => {
    const step = stepRef.current
    if (step >= CANDIDATES.length) {
      setRunning(false)
      return
    }
    const c = CANDIDATES[step]
    setCurrent(c)
    timerRef.current = setTimeout(() => {
      setShown(s => [...s, c.token])
      stepRef.current += 1
      setCurrent(null)
      timerRef.current = setTimeout(tick, 350)
    }, 900)
  }

  useEffect(() => () => clearTimeout(timerRef.current), [])

  return (
    <div className="card">
      <h3 className="sub-title">Next-Token 预测 · 看着 LLM 一个字一个字往外蹦</h3>
      <p className="body-text">
        LLM 本质上是个「文字接龙机器」：每一步都根据已有内容预测下一个 token 的概率分布，
        采样一个接上，然后循环。所谓流畅的回答，就是这么蹦出来的。
      </p>
      <div
        style={{
          background: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: 12,
          padding: '18px 20px', fontFamily: 'var(--mono)', fontSize: 16, minHeight: 58,
          display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center',
        }}
      >
        {shown.map((t, i) => (
          <span key={i} style={{ background: 'var(--panel-2)', padding: '3px 8px', borderRadius: 6, animation: 'fadeInUp .3s ease both' }}>
            {t}
          </span>
        ))}
        {current && (
          <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
            <span className="cursor-blink" style={{ color: 'var(--accent)' }}>▌</span>
            {current.alts.map((a, i) => (
              <span
                key={i}
                style={{
                  padding: '3px 8px', borderRadius: 6, fontSize: 13,
                  border: '1px solid ' + (a === current.token ? 'var(--ok)' : 'var(--border)'),
                  color: a === current.token ? 'var(--ok)' : 'var(--text-dim)',
                  opacity: a === current.token ? 1 : 0.7,
                }}
              >
                {a}
                <sub style={{ marginLeft: 4, fontSize: 10 }}>{a === current.token ? current.p : (Math.max(0.02, (1 - current.p) / (current.alts.length - 1))).toFixed(2)}</sub>
              </span>
            ))}
          </span>
        )}
        {!current && !running && stepRef.current >= CANDIDATES.length && <span style={{ color: 'var(--ok)', fontSize: 14 }}>✔ 生成完毕（EOS）</span>}
      </div>
      <button className="quiz-option" style={{ width: 'auto', marginTop: 12, padding: '8px 18px' }} onClick={start}>
        {running ? '生成中…' : stepRef.current >= CANDIDATES.length ? '🔄 重新生成' : '▶ 开始生成'}
      </button>
      <style>{`.cursor-blink { animation: blink 0.8s steps(2) infinite; }`}</style>
    </div>
  )
}
