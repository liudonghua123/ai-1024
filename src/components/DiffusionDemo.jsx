import { useEffect, useRef, useState } from 'react'

/**
 * 扩散模型去噪动画：纯 Canvas，从纯噪声逐步"显现"出一只像素猫（16x16 图案）。
 * 拖动滑块可以手动控制时间步 t。
 */
export default function DiffusionDemo() {
  const canvasRef = useRef(null)
  const [t, setT] = useState(24) // 0 = 干净图像, 24 = 纯噪声
  const [playing, setPlaying] = useState(false)
  const T_MAX = 24

  // 16x16 像素猫图案（1 = 猫身体, 2 = 眼睛, 3 = 鼻子）
  const CAT = [
    '................',
    '..11........11..',
    '.1111......1111.',
    '.11111111111111.',
    '1111111111111111',
    '1111111111111111',
    '112211111112211.',
    '112211111112211.',
    '1111111331111111',
    '1111111111111111',
    '.11111111111111.',
    '.11111111111111.',
    '..111111111111..',
    '...111....111...',
    '...11......11...',
    '................',
  ]

  function drawAt(tt) {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const cell = 22
    canvas.width = 16 * cell
    canvas.height = 16 * cell
    const alpha = 1 - tt / T_MAX // 图像清晰度
    const isLight = document.documentElement.dataset.theme === 'light'
  for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 16; x++) {
        const c = CAT[y][x]
        const noise = Math.random()
        let r, g, b
        if (noise < alpha) {
          // 图像信号
          if (c === '2') { r = 60; g = 200; b = 255 }
          else if (c === '3') { r = 255; g = 140; b = 160 }
          else if (c === '1') { r = 235; g = 190; b = 120 }
          else { r = isLight ? 225 : 20; g = isLight ? 232 : 26; b = isLight ? 240 : 36 }
        } else {
          // 噪声信号
          const v = 40 + Math.random() * 180
          r = v; g = v * 0.9; b = v * 1.1
        }
        ctx.fillStyle = `rgb(${r | 0},${g | 0},${b | 0})`
        ctx.fillRect(x * cell, y * cell, cell - 1, cell - 1)
      }
    }
  }

  useEffect(() => { drawAt(t) }, [t])

  useEffect(() => {
    if (!playing) return
    const iv = setInterval(() => {
      setT(prev => {
        if (prev <= 0) { setPlaying(false); return 0 }
        return prev - 1
      })
    }, 130)
    return () => clearInterval(iv)
  }, [playing])

  return (
    <div className="card">
      <h3 className="sub-title">扩散去噪演示 · 从一坨噪声里"炼"出一只猫</h3>
      <p className="body-text">
        训练时模型学会「给图像加噪声」的逆过程；生成时从纯噪声（t = T）出发，一步步预测并去掉噪声，
        最终得到清晰图像。拖动滑块或点击播放，亲手体验去噪过程。
      </p>
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
        <canvas ref={canvasRef} style={{ borderRadius: 12, border: '1px solid var(--border)', imageRendering: 'pixelated', maxWidth: 280 }} />
        <div style={{ flex: 1, minWidth: 220 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--text-dim)', marginBottom: 8 }}>
            时间步 t = {t} / {T_MAX} &nbsp;→&nbsp; {t === 0 ? '清晰图像' : t >= T_MAX ? ' 纯噪声' : `噪声 ≈ ${((t / T_MAX) * 100).toFixed(0)}%`}
          </div>
          <input
            type="range" min="0" max={T_MAX} value={t}
            onChange={e => { setPlaying(false); setT(+e.target.value) }}
            style={{ width: '100%', accentColor: '#38e1ff', cursor: 'pointer' }}
          />
          <button className="quiz-option" style={{ width: 'auto', marginTop: 12, padding: '8px 18px' }} onClick={() => { if (t === 0) setT(T_MAX); setTimeout(() => setPlaying(true), 50) }}>
            {playing ? '去噪中…' : '播放去噪'}
          </button>
        </div>
      </div>
    </div>
  )
}
