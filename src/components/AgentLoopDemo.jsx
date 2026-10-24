import { useEffect, useRef, useState } from 'react'

const SCRIPT = [
  { actor: '🧠 LLM', text: '目标：查明天安门广场今天天气，然后决定文案。先调用 weather 工具。', tag: '思考' },
  { actor: '🔧 工具', text: 'weather("北京") → 晴，22°C，紫外线强', tag: '工具调用' },
  { actor: '🧠 LLM', text: '晴且紫外线强 → 广告文案强调"防晒出门"。再调用 search 查热门景点。', tag: '思考' },
  { actor: '🔧 工具', text: 'search("今天热门景点") → 什刹海、奥森公园、景山', tag: '工具调用' },
  { actor: '🧠 LLM', text: '信息足够。调用 write_draft 生成文案。', tag: '思考' },
  { actor: '🔧 工具', text: 'write_draft(...) → "晴日限定｜什刹海的风和 22°C 的阳光都在等你，防晒出门，快乐加倍 ☀️"', tag: '工具调用' },
  { actor: '✅ 完成', text: '任务闭环：思考 → 行动 → 观察 → 再思考 → 输出。', tag: '终止' },
]

const COLORS = { 思考: 'var(--accent)', 工具调用: 'var(--warn)', 终止: 'var(--ok)' }

/** Agent 循环演示：ReAct 模式 跑一遍任务 */
export default function AgentLoopDemo() {
  const [step, setStep] = useState(0)
  const [running, setRunning] = useState(false)
  const timer = useRef(null)

  useEffect(() => {
    if (!running) return
    if (step >= SCRIPT.length) { setRunning(false); return }
    timer.current = setTimeout(() => setStep(s => s + 1), 1400)
    return () => clearTimeout(timer.current)
  }, [running, step])

  return (
    <div className="card">
      <h3 className="sub-title">Agent ReAct 循环 · 看着它思考-行动-观察</h3>
      <p className="body-text">
        Agent = LLM 大脑 + 工具手脚 + 循环调度。它不是一次生成答案，而是不断：
        <strong>思考（Reason）→ 行动（Act，调工具）→ 观察（Observe 结果）→ 再思考</strong>，直到任务完成。
        下面这个任务流，点播放看它跑一圈：
      </p>
      <div
        style={{
          background: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: 12,
          padding: '16px', minHeight: 120, display: 'flex', flexDirection: 'column', gap: 8,
        }}
      >
        {SCRIPT.slice(0, step).map((s, i) => (
          <div
            key={i}
            style={{
              display: 'flex', gap: 10, alignItems: 'flex-start',
              borderLeft: `3px solid ${COLORS[s.tag]}`,
              paddingLeft: 12, animation: 'fadeInUp 0.4s ease both',
            }}
          >
            <span style={{ fontWeight: 700, whiteSpace: 'nowrap', color: COLORS[s.tag], fontSize: 13.5 }}>{s.actor}</span>
            <span style={{ color: 'var(--text)', fontSize: 13.5, lineHeight: 1.6 }}>{s.text}</span>
          </div>
        ))}
        {running && step < SCRIPT.length && (
          <div style={{ color: 'var(--text-dim)', fontFamily: 'var(--mono)', fontSize: 13 }}>
            <span className="cursor-blink">▌</span> {SCRIPT[step].actor} 正在{SCRIPT[step].tag === '思考' ? '思考' : '执行'}…
          </div>
        )}
      </div>
      <button
        className="quiz-option"
        style={{ width: 'auto', marginTop: 12, padding: '8px 18px' }}
        onClick={() => { if (step >= SCRIPT.length) setStep(0); setRunning(true) }}
      >
        {running ? '⏸ 任务执行中…' : step >= SCRIPT.length ? '🔄 再跑一遍' : '▶ 启动 Agent'}
      </button>
      <style>{`.cursor-blink { animation: blink 0.8s steps(2) infinite; }`}</style>
    </div>
  )
}
