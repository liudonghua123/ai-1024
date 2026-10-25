import { useEffect, useRef, useState } from 'react'

const CATS_GA = ['人脸', '猫', '风景', '建筑']
const STEPS = 40

/**
 * GAN 博弈动画：生成器从噪声造图，判别器打真/假分，
 * 两个分数此消彼长直到平衡。
 */
export default function GanBattle() {
  const [step, setStep] = useState(0)
  const [running, setRunning] = useState(true)

  useEffect(() => {
    if (!running) return
    const iv = setInterval(() => setStep(s => s + 1), 110)
    return () => clearInterval(iv)
  }, [running])

  // 生成器能力 0→1（sigmoid 上升），判别器精度先高后降到 0.5（纳什均衡）
  const gAbility = 1 - Math.exp(-step / 14)
  const dAcc = 0.95 - 0.45 * (1 - Math.exp(-step / 16))

  const W = 560, H = 240
  const px = t => 40 + t * (W - 70)
  const py = v => H - 30 - v * (H - 55)

  const gPath = Array.from({ length: step + 1 }, (_, i) => {
    const t = i / STEPS
    return `${px(t)},${py(1 - Math.exp(-i / 14))}`
  }).join(' ')
  const dPath = Array.from({ length: step + 1 }, (_, i) => {
    const t = i / STEPS
    return `${px(t)},${py(0.95 - 0.45 * (1 - Math.exp(-i / 16)))}`
  }).join(' ')

  return (
    <div className="card">
      <h3 className="sub-title">GAN 博弈 · 造假者与警察的军备赛</h3>
      <p className="body-text">
        生成器（G）从随机噪声造假图，判别器（D）负责辨别真假。两者对抗训练：
        G 学会骗过 D，D 学会识破 G——理想终点是<strong>纳什均衡</strong>：
        D 准确率掉到 50%（完全分不出真假），G 生成以假乱真。
      </p>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 10 }}>
        {CATS_GA.map((c, i) => {
          // 生成器对不同类别的"掌握度"略有差异
          const quality = Math.min(0.98, gAbility + 0.15 * Math.sin(i * 2.2))
          return (
            <div key={c} style={{ textAlign: 'center' }}>
              <div style={{
                width: 74, height: 74, borderRadius: 12, margin: '0 auto 6px',
                border: `1.5px solid ${quality > 0.7 ? 'var(--ok)' : 'var(--border)'}`,
                background: `color-mix(in srgb, rgba(var(--heat-rgb), ${quality.toFixed(2)}) 100%, var(--panel-2) ${((1 - quality) * 100).toFixed(0)}%)`,
                imageRendering: 'pixelated',
                filter: quality > 0.7 ? 'none' : `blur(${(1 - quality) * 3}px)`,
                transition: 'all 0.3s',
              }} />
              <span style={{ fontSize: 11.5, color: quality > 0.7 ? 'var(--ok)' : 'var(--text-dim)' }}>
                {c} {Math.round(quality * 100)}%
              </span>
            </div>
          )
        })}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%' }}>
        {[0, 0.5, 1].map(v => (
          <g key={v}>
            <line x1={40} y1={py(v)} x2={W - 20} y2={py(v)} stroke="var(--border)" strokeDasharray="3 4" strokeWidth="0.7" />
            <text x={34} y={py(v) + 4} textAnchor="end" fontSize="10" fill="var(--text-dim)" fontFamily="var(--mono)">{v}</text>
          </g>
        ))}
        <line x1={px(0.5)} y1={20} x2={px(0.5)} y2={H - 25} stroke="var(--ok)" strokeWidth="1" strokeDasharray="5 4" opacity="0.6" />
        <text x={px(0.5)} y={16} textAnchor="middle" fontSize="10" fill="var(--ok)">纳什均衡</text>
        <polyline points={dPath} fill="none" stroke="var(--bad)" strokeWidth="2.4" />
        <polyline points={gPath} fill="none" stroke="var(--ok)" strokeWidth="2.4" />
        <text x={W - 150} y={py(0.9)} fontSize="11" fill="var(--bad)">D 判别准确率</text>
        <text x={W - 150} y={py(0.75)} fontSize="11" fill="var(--ok)">G 以假乱真度</text>
      </svg>
      <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-dim)' }}>
        训练步数 {step % (STEPS + 30)} · D 准确率 <strong style={{ color: 'var(--bad)' }}>{dAcc.toFixed(2)}</strong>（越接近 0.5，G 越强）
        <button className="quiz-option" style={{ width: 'auto', margin: '0 0 0 14px', padding: '4px 14px' }} onClick={() => { setStep(0); setRunning(r => !r) }}>
          {running ? '重放' : '继续'}
        </button>
      </p>
      <div className="callout warn">
        GAN 开创了"生成 vs 判别"的对抗范式（2014），但训练不稳定、模式坍塌是老大难。
        2020 年后 DDPM 扩散模型以更稳的训练接管了生成王座——GAN 的思想遗产延续至今。
      </div>
    </div>
  )
}
