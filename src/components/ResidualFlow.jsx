import { useEffect, useState } from 'react'

const LAYERS = 10
const TRAIN_STEPS = 60

/**
 * 残差连接动画：两条路径（恒等捷径 vs 变换路径），
 * 展示为什么梯度能无衰减地直达底层。
 */
export default function ResidualFlow() {
  const [step, setStep] = useState(0)
  const [running, setRunning] = useState(true)

  useEffect(() => {
    if (!running) return
    const iv = setInterval(() => setStep(s => (s + 1) % (TRAIN_STEPS + 20)), 70)
    return () => clearInterval(iv)
  }, [running])

  const gradDepth = Math.min(step / TRAIN_STEPS, 1.15) // 梯度穿透深度 0..1+

  const W = 460, H = 260, xL = 130, xR = 330
  const yOf = i => 30 + (i / (LAYERS - 1)) * (H - 60)

  return (
    <div className="card">
      <h3 className="sub-title">残差连接 · 梯度的高速公路</h3>
      <p className="body-text">
        56 层 plain 网络反而比 20 层更差——梯度传到底层就消失了。ResNet 的答案：
        <strong>输出 = F(x) + x</strong>，给每层加一条"恒等捷径"，梯度可以原路直达任何层。
        从此千层网络成为可能，Transformer 里每层都有它。
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: 560, display: 'block', margin: '0 auto' }}>
        <defs>
          <marker id="arrowhead" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto">
            <polygon points="0 0, 7 3, 0 6" fill="var(--accent-2)" />
          </marker>
          <marker id="arrowhead-g" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto">
            <polygon points="0 0, 7 3, 0 6" fill="var(--ok)" />
          </marker>
        </defs>

        {/* 各层 */}
        {Array.from({ length: LAYERS }, (_, i) => {
          const y = yOf(i)
          return (
            <g key={i}>
              <rect x={xL - 46} y={y - 8} width={92} height={16} rx={8}
                fill="var(--panel-2)" stroke="var(--border)" />
              <text x={xL} y={y + 4} textAnchor="middle" fontSize="9" fill="var(--text-dim)" fontFamily="var(--mono)">
                Layer {i + 1}
              </text>
            </g>
          )
        })}

        {/* 变换路径（竖线贯穿层） */}
        <line x1={xL} y1={yOf(0)} x2={xL} y2={yOf(LAYERS - 1)} stroke="var(--accent-2)" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x={xL - 90} y={H / 2} fontSize="11" fill="var(--accent-2)" fontFamily="var(--sans)" transform={`rotate(-90, ${xL - 90}, ${H / 2})`} textAnchor="middle">
          变换路径 F(x)
        </text>

        {/* 残差捷径（右侧弧线） */}
        <path
          d={`M ${xR} ${yOf(0)} L ${xR} ${yOf(LAYERS - 1)}`}
          stroke="var(--ok)" strokeWidth="2.5" fill="none" strokeDasharray="7 5"
          style={{ animation: 'dashFlow 1.2s linear infinite' }}
          markerEnd="url(#arrowhead-g)"
        />
        <text x={xR + 16} y={H / 2} fontSize="11" fill="var(--ok)" fontFamily="var(--sans)" transform={`rotate(90, ${xR + 16}, ${H / 2})`} textAnchor="middle">
          恒等捷径 x（梯度直达）
        </text>

        {/* 梯度反向传播可视化：从顶层往下渗透 */}
        {Array.from({ length: LAYERS }, (_, i) => {
          const depthFromTop = (LAYERS - 1 - i) / (LAYERS - 1)
          const reached = gradDepth >= depthFromTop
          const y = yOf(i)
          return (
            <circle
              key={`g${i}`}
              cx={xR} cy={y} r={reached ? 6 : 3}
              fill={reached ? 'var(--ok)' : 'var(--border)'}
              opacity={reached ? 0.95 : 0.5}
              style={{ transition: 'all 0.2s' }}
            />
          )
        })}
      </svg>
      <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-dim)', marginTop: 4 }}>
        反向传播中：梯度已穿透 <strong style={{ color: 'var(--ok)' }}>{Math.min(Math.round(gradDepth * 10) / 10 * 100, 100)}%</strong> 的层
        {gradDepth >= 1 && ' —— 全部到达'}
        <button className="quiz-option" style={{ width: 'auto', margin: '0 0 0 14px', padding: '4px 14px' }} onClick={() => setRunning(r => !r)}>
          {running ? '暂停' : '播放'}
        </button>
      </p>
      <div className="callout ok">
        为什么有效：恒等映射让"这层什么都不学"成为最容易的默认解——网络只需要学<strong>增量修正</strong>，
        而不是从头重建信息。这就是 152 层 ResNet、百层 Transformer 都训得动的秘密。
      </div>
    </div>
  )
}
