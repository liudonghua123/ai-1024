import { useEffect, useRef, useState } from 'react'

/**
 * Scaling Laws 幂律曲线动画：三条线（参数/数据/算力）随规模下降的 loss。
 * SVG 路径 + stroke-dashoffset 描线动画。
 */
export default function ScalingCurve() {
  const [progress, setProgress] = useState(0)
  const [playing, setPlaying] = useState(true)
  const raf = useRef(null)

  useEffect(() => {
    if (!playing) return
    let start = null
    const dur = 4000
    const tick = t => {
      if (!start) start = t
      const p = Math.min((t - start) / dur, 1)
      setProgress(p)
      if (p < 1) raf.current = requestAnimationFrame(tick)
      else setPlaying(false)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [playing])

  const W = 560, H = 300, PAD = 44
  const xs = 10 ** -1, xe = 10 ** 3.3 // x: 0.1 .. ~2000 (相对规模)
  const yOf = loss => PAD + (1 - (loss - 1.5) / (6.5 - 1.5)) * (H - 2 * PAD)
  const xOf = lx => PAD + ((Math.log10(lx) - Math.log10(xs)) / (Math.log10(xe) - Math.log10(xs))) * (W - PAD - 16)

  // loss = a * x^-0.095 + b (典型幂律形状)
  const curve = (a, b, jitter = 0) =>
    Array.from({ length: 60 }, (_, i) => {
      const lx = xs * (xe / xs) ** (i / 59)
      const loss = a * lx ** -0.095 + b + jitter * Math.sin(i * 1.7)
      return `${xOf(lx)},${yOf(loss)}`
    }).join(' ')

  const SERIES = [
    { name: '参数量 ↑', a: 2.2, b: 1.4, color: 'var(--accent)' },
    { name: '数据量 ↑', a: 2.6, b: 1.5, color: 'var(--ok)' },
    { name: '算力 ↑', a: 3.0, b: 1.6, color: 'var(--warn)' },
  ]

  return (
    <div className="card">
      <h3 className="sub-title">Scaling Laws · loss 随规模可预测地下降</h3>
      <p className="body-text">
        双对数坐标下，loss 与规模呈<strong>直线关系</strong>——这就是 2020 年 OpenAI 发现的幂律。
        意义重大：不用训完就能预测最终性能，"大力出奇迹"从赌博变成了工程核算。
      </p>
      <div style={{ overflowX: 'auto' }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', minWidth: 480 }}>
          {/* 网格 */}
          {[2, 3, 4, 5, 6].map(v => (
            <g key={v}>
              <line x1={PAD} y1={yOf(v)} x2={W - 16} y2={yOf(v)} stroke="var(--border)" strokeWidth="0.6" strokeDasharray="3 4" />
              <text x={PAD - 8} y={yOf(v) + 4} textAnchor="end" fontSize="10" fill="var(--text-dim)" fontFamily="var(--mono)">{v}</text>
            </g>
          ))}
          <text x={12} y={PAD - 14} fontSize="11" fill="var(--text-dim)">loss →</text>
          <text x={W - 70} y={H - 8} fontSize="11" fill="var(--text-dim)">规模（10× 增长）→</text>

          {/* 曲线描线动画 */}
          {SERIES.map(s => {
            const pts = curve(s.a, s.b, 0.04)
            const fullLen = 1200
            return (
              <g key={s.name}>
                <polyline points={pts} fill="none" stroke={s.color} strokeWidth="2.6" strokeLinecap="round"
                  strokeDasharray={fullLen}
                  strokeDashoffset={fullLen * (1 - progress)}
                />
              </g>
            )
          })}

          {/* 图例 */}
          {SERIES.map((s, i) => (
            <g key={s.name} transform={`translate(${W - 150}, ${PAD + 8 + i * 22})`}>
              <line x1="0" y1="0" x2="26" y2="0" stroke={s.color} strokeWidth="3" />
              <text x="34" y="4" fontSize="11.5" fill="var(--text)" fontFamily="var(--sans)">{s.name}</text>
            </g>
          ))}
        </svg>
      </div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 4 }}>
        <button className="quiz-option" style={{ width: 'auto', margin: 0, padding: '7px 18px' }} onClick={() => { setProgress(0); setPlaying(true) }}>
          {progress >= 1 ? '重放' : '描线中…'}
        </button>
        <span style={{ fontSize: 13, color: 'var(--text-dim)' }}>
          2022 年 Chinchilla 修正：同等算力下，<strong style={{ color: 'var(--text)' }}>数据和参数要同比放大</strong>（70B 模型喂 1.4T token 最优）——GPT-3 那代模型其实都"吃少了"。
        </span>
      </div>
    </div>
  )
}
