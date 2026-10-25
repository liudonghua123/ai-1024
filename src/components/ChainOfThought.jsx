import { useEffect, useState } from 'react'

const CHAIN = [
  { step: '问题', text: '小明有 23 个苹果，买了 3 箱每箱 12 个，又吃掉 9 个，还剩几个？' },
  { step: '拆解', text: '先算买来的：3 箱 × 12 个/箱 = 36 个' },
  { step: '累加', text: '原有 23 个 + 买来 36 个 = 59 个' },
  { step: '减去', text: '59 个 − 吃掉 9 个 = 50 个' },
  { step: '结论', text: '还剩 50 个苹果 ✅' },
]

/**
 * CoT 思维链动画：直接回答 vs 一步步推理。
 */
export default function ChainOfThought() {
  const [mode, setMode] = useState('cot')
  const [step, setStep] = useState(0)
  const [wrong, setWrong] = useState(false)

  useEffect(() => {
    if (mode !== 'cot') return
    if (step >= CHAIN.length) return
    const t = setTimeout(() => setStep(s => s + 1), 1000)
    return () => clearTimeout(t)
  }, [mode, step])

  const restart = m => {
    setMode(m)
    setStep(0)
    setWrong(false)
    if (m === 'direct') setTimeout(() => setWrong(true), 900)
  }

  return (
    <div className="card">
      <h3 className="sub-title">思维链动画 · "让我们一步一步想"</h3>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button className="quiz-option" style={{ width: 'auto', margin: 0, padding: '8px 16px', borderColor: mode === 'direct' && wrong ? 'var(--accent-3)' : undefined }} onClick={() => restart('direct')}>
          ❌ 不思考直接答
        </button>
        <button className="quiz-option" style={{ width: 'auto', margin: 0, padding: '8px 16px', borderColor: mode === 'cot' && step >= CHAIN.length ? 'var(--ok)' : undefined }} onClick={() => restart('cot')}>
          ✅ 思维链推理
        </button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0, alignItems: 'stretch', justifyContent: 'center' }}>
        {CHAIN.map((c, i) => {
          let show = false
          let fail = false
          if (mode === 'cot') {
            show = i <= step && step > 0
            // direct 模式：问题直接连结论
          } else {
            show = i === 0 || i === CHAIN.length - 1
            fail = i === CHAIN.length - 1 && wrong
          }
          if (!show) return <div key={i} style={{ width: i === CHAIN.length - 1 ? 0 : 0 }} />
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'stretch' }}>
              {i > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', padding: '0 6px', color: fail ? 'var(--accent-3)' : 'var(--accent-2)', fontSize: 18 }}>
                  {mode === 'direct' && i === CHAIN.length - 1 ? '⚡' : '➜'}
                </div>
              )}
              <div
                style={{
                  maxWidth: 250, padding: '10px 14px', borderRadius: 10, fontSize: 13,
                  border: `1.5px solid ${fail ? 'var(--accent-3)' : i === 0 ? 'var(--accent-2)' : i === CHAIN.length - 1 ? (fail ? 'var(--accent-3)' : 'var(--ok)') : 'var(--border)'}`,
                  background: fail ? 'rgba(255,92,138,.08)' : i === 0 ? 'rgba(124,92,255,.08)' : 'var(--panel-2)',
                  animation: 'fadeInUp 0.45s ease both',
                  lineHeight: 1.7,
                }}
              >
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, marginBottom: 4, color: fail ? 'var(--accent-3)' : 'var(--accent)' }}>
                  {c.step}
                </div>
                {c.text}
                {fail && <div style={{ marginTop: 4, fontSize: 12, color: 'var(--accent-3)' }}>—— 跳步导致算错：44 ❌</div>}
              </div>
            </div>
          )
        })}
      </div>

      <div className={`callout ${mode === 'direct' && wrong ? 'warn' : 'ok'}`} style={{ marginTop: 16 }}>
        {mode === 'direct' && wrong ? (
          <>模型被问"跳步"的题时，直接映射问题→答案，中间环节全靠直觉脑补，小模型极易算错。CoT 论文发现：<strong>同样的模型，只要让它"先写步骤再给答案"，GSM8K 数学题正确率翻三倍</strong>。</>
        ) : (
          <>CoT 的本质：<strong>把"一步到位"拆成 N 个简单步骤，每步只做一次容易的预测</strong>——计算量换准确率。这也是 o1/R1 类推理模型的起点：让模型在回答前"想更久"。</>
        )}
      </div>
    </div>
  )
}
