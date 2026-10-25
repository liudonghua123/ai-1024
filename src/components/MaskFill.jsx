import { useState } from 'react'

/**
 * BERT vs GPT 预训练目标对比动画。
 * 遮住一个词，展示两种"完形填空"方式的差异。
 */
const SENT = ['我', '今天', '想', '吃', '火锅']
const SENT2 = ['The', 'cat', 'sat', 'on', 'the', 'mat']

export default function MaskFill() {
  const [mode, setMode] = useState('bert') // bert | gpt
  const [zh, setZh] = useState(true)
  const words = zh ? SENT : SENT2
  const maskIdx = 3 // 第 4 个词

  // GPT：只看左边，从左往右逐个揭示
  // BERT：随机遮一个，看前后文
  const revealAll = mode === 'gpt'

  return (
    <div className="card">
      <h3 className="sub-title">两种完形填空 · BERT 与 GPT 的分岔路口</h3>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <Seg on={mode === 'bert'} onClick={() => setMode('bert')}>BERT 方式：完形填空（MLM）</Seg>
        <Seg on={mode === 'gpt'} onClick={() => setMode('gpt')}>GPT 方式：接龙（CLM）</Seg>
        <Seg on={zh} onClick={() => setZh(!zh)}>{zh ? '中文' : 'English'}</Seg>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', padding: '22px 12px', background: 'var(--panel-2)', borderRadius: 12, border: '1px solid var(--border)' }}>
        {words.map((w, i) => {
          const isMaskTarget = i === maskIdx
          // bert: 目标词被遮住显示 [MASK]，其余全可见
          // gpt: 目标词之前的全可见，目标词及之后显示 ▓ 或逐个出现
          let visible, label = w, style = {}
          if (mode === 'bert') {
            visible = !isMaskTarget
            if (isMaskTarget) { label = '[MASK]'; style = { color: 'var(--warn)', borderColor: 'var(--warn)', animation: 'blink 1.2s steps(2) infinite' } }
          } else {
            visible = i < maskIdx
            if (i === maskIdx) { label = '❓ 预测中'; style = { color: 'var(--accent)', borderColor: 'var(--accent)' } }
            else if (!visible) { label = '▓▓'; style = { opacity: 0.35 } }
          }
          return (
            <span
              key={i}
              className="mask-token"
              style={{
                padding: '8px 14px', borderRadius: 8, fontSize: 15,
                fontFamily: zh ? 'var(--sans)' : 'var(--mono)',
                border: '1.5px solid var(--border)',
                background: visible ? 'var(--panel)' : 'transparent',
                color: visible ? 'var(--text)' : 'var(--text-dim)',
                transition: 'all 0.4s',
                ...style,
              }}
            >
              {label}
            </span>
          )
        })}
      </div>

      <div className={`callout ${mode === 'bert' ? '' : 'ok'}`} style={{ marginTop: 14 }}>
        {mode === 'bert' ? (
          <>
            <strong>BERT（双向）</strong>：遮住一个词，<strong>同时看前后文</strong>猜它是谁。
            学到的是深度的双向理解，擅长阅读理解、分类，但天生不会"往下写"。
          </>
        ) : (
          <>
            <strong>GPT（单向）</strong>：只看<strong>左边</strong>的所有词，预测下一个。
            每个位置都在做"预测下一词"——训练目标与生成完全一致，越训越会写。
            这就是为什么最后是 GPT 系走到了对话。
          </>
        )}
      </div>
    </div>
  )
}

function Seg({ on, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        cursor: 'pointer', fontSize: 13, padding: '8px 16px', borderRadius: 20,
        border: `1.5px solid ${on ? 'var(--accent)' : 'var(--border)'}`,
        background: on ? 'var(--panel-2)' : 'var(--panel)',
        color: on ? 'var(--accent)' : 'var(--text-dim)',
        fontWeight: on ? 700 : 400, fontFamily: 'var(--sans)', transition: 'all 0.2s',
      }}
    >
      {children}
    </button>
  )
}
