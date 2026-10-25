import { useEffect, useState } from 'react'

/**
 * 卷积核滑动动画：3x3 核在 5x5 特征图上滑动，输出 3x3。
 * 纯 SVG + CSS 动画，自动循环。
 */
export default function ConvSlide() {
  const cell = 34
  const N = 5
  const OUT = 3
  const [pos, setPos] = useState(0) // 0..8 输出位置
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const iv = setInterval(() => setPos(p => (p + 1) % (OUT * OUT)), 900)
    return () => clearInterval(iv)
  }, [paused])

  const row = Math.floor(pos / OUT)
  const col = pos % OUT

  // 固定的伪随机输入特征图
  const INPUT = [
    [3, 1, 0, 2, 4], [2, 5, 3, 1, 0], [0, 2, 4, 5, 3], [4, 0, 1, 3, 2], [1, 3, 2, 0, 5],
  ]
  const KERNEL = [[1, 0, -1], [1, 0, -1], [1, 0, -1]]
  const outVal = (() => {
    let s = 0
    for (let dy = 0; dy < 3; dy++) for (let dx = 0; dx < 3; dx++) s += INPUT[row + dy][col + dx] * KERNEL[dy][dx]
    return s
  })()

  return (
    <div className="card">
      <h3 className="sub-title">卷积滑动动画 · 看着 3×3 核扫过特征图</h3>
      <p className="body-text">
        卷积 = 一个小窗口（卷积核）在图像上滑动，每停一处做加权求和，输出一个数。
        同一个核扫完整张图——这就是"权值共享"，参数量远小于全连接。
        不同的核学出不同的"眼睛"：边缘检测器、纹理检测器、猫耳检测器……层层堆叠。
      </p>
      <div style={{ display: 'flex', gap: 30, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
        {/* 输入特征图 */}
        <div>
          <div style={labelStyle}>输入 5×5</div>
          <svg width={N * cell + 4} height={N * cell + 4} style={{ background: 'var(--panel-2)', borderRadius: 10, border: '1px solid var(--border)' }}>
            {INPUT.map((r, y) =>
              r.map((v, x) => (
                <g key={`${x}-${y}`}>
                  <rect
                    x={x * cell + 2} y={y * cell + 2} width={cell - 3} height={cell - 3} rx={5}
                    fill={`rgba(var(--heat-rgb), ${(v / 10).toFixed(2)})`}
                    stroke="var(--border)" strokeWidth="0.5"
                  />
                  <text x={x * cell + cell / 2 + 2} y={y * cell + cell / 2 + 5} textAnchor="middle" fontSize="12" fill="var(--text)" fontFamily="var(--mono)">{v}</text>
                </g>
              )),
            )}
            {/* 滑动窗口高亮 */}
            <rect
              x={col * cell + 2} y={row * cell + 2}
              width={cell * 3 - 1} height={cell * 3 - 1} rx={8}
              fill="none" stroke="var(--accent)" strokeWidth="3"
              style={{ transition: 'all 0.45s cubic-bezier(.4,0,.2,1)' }}
            />
          </svg>
        </div>

        {/* 卷积核 */}
        <div>
          <div style={labelStyle}>卷积核 3×3</div>
          <svg width={3 * cell + 4} height={3 * cell + 4}>
            {KERNEL.map((r, y) =>
              r.map((v, x) => (
                <g key={`${x}-${y}`}>
                  <rect x={x * cell + 2} y={y * cell + 2} width={cell - 3} height={cell - 3} rx={5}
                    fill={v > 0 ? 'rgba(61,220,132,.35)' : v < 0 ? 'rgba(255,92,138,.35)' : 'var(--panel-2)'}
                    stroke="var(--border)" />
                  <text x={x * cell + cell / 2 + 2} y={y * cell + cell / 2 + 5} textAnchor="middle" fontSize="13" fill="var(--text)" fontFamily="var(--mono)">{v}</text>
                </g>
              )),
            )}
          </svg>
        </div>

        <div style={{ fontSize: 24, color: 'var(--accent)', animation: 'arrowPulse 1.2s ease-in-out infinite' }}></div>

        {/* 输出 */}
        <div>
          <div style={labelStyle}>输出 3×3</div>
          <svg width={OUT * cell + 4} height={OUT * cell + 4}>
            {Array.from({ length: OUT * OUT }, (_, i) => {
              const r = Math.floor(i / OUT), c = i % OUT
              const on = i === pos
              let s = 0
              for (let dy = 0; dy < 3; dy++) for (let dx = 0; dx < 3; dx++) s += INPUT[r + dy][c + dx] * KERNEL[dy][dx]
              return (
                <g key={i}>
                  <rect x={c * cell + 2} y={r * cell + 2} width={cell - 3} height={cell - 3} rx={5}
                    fill={on ? 'var(--accent)' : 'var(--panel-2)'}
                    stroke="var(--border)" style={{ transition: 'fill 0.3s' }} />
                  <text x={c * cell + cell / 2 + 2} y={r * cell + cell / 2 + 5} textAnchor="middle" fontSize="12"
                    fill={on ? '#0a0e14' : 'var(--text-dim)'} fontFamily="var(--mono)" fontWeight={on ? 700 : 400}>{s}</text>
                </g>
              )
            })}
          </svg>
        </div>
      </div>
      <p style={{ textAlign: 'center', marginTop: 12, fontSize: 13.5, color: 'var(--text-dim)' }}>
        当前输出值 = <strong style={{ color: 'var(--accent)' }}>{outVal}</strong>
        （窗口第 {row + 1} 行第 {col + 1} 列）
        <button className="quiz-option" style={{ width: 'auto', margin: '0 0 0 14px', padding: '4px 14px' }} onClick={() => setPaused(p => !p)}>
          {paused ? '继续' : '暂停'}
        </button>
      </p>
    </div>
  )
}

const labelStyle = { fontSize: 12, color: 'var(--text-dim)', fontFamily: 'var(--mono)', marginBottom: 6, textAlign: 'center' }
