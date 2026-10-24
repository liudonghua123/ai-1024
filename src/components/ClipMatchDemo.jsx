import { useState } from 'react'

const PAIRS = [
  { img: '🐱', desc: '一只戴墨镜的橘猫', sim: 0.94, distract: ['一只奔跑的狗', '电动汽车', '日落海滩'] },
  { img: '🚗', desc: '一辆红色敞篷车', sim: 0.91, distract: ['一列绿皮火车', '草莓蛋糕', '雪山日出'] },
  { img: '🌊', desc: '夕阳下的海浪', sim: 0.89, distract: '城市夜景, 一碗牛肉面, 蓝色毛线球'.split(', ') },
]

/** CLIP 对齐演示：点击图像，看它与各文本描述的相似度 */
export default function ClipMatchDemo() {
  const [sel, setSel] = useState(0)
  const pair = PAIRS[sel]

  return (
    <div className="card">
      <h3 className="sub-title">CLIP 对齐实验 · 图文说的必须是同一种语言</h3>
      <p className="body-text">
        CLIP 用 4 亿图文对训练出双塔编码器：图像和文字各自编码成向量，再算余弦相似度。
        匹配的图文对相似度接近 1，不匹配的接近 0。Stable Diffusion 正是靠它把"提示词"翻译成"图像语义"。
      </p>
      <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
        {PAIRS.map((p, i) => (
          <button
            key={i}
            onClick={() => setSel(i)}
            style={{
              fontSize: 30, padding: '10px 18px', cursor: 'pointer',
              borderRadius: 12,
              background: sel === i ? 'var(--panel-2)' : 'var(--panel)',
              border: `2px solid ${sel === i ? 'var(--accent)' : 'var(--border)'}`,
              transition: 'all 0.2s',
            }}
          >
            {p.img}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[pair.desc, ...pair.distract].map((d, i) => {
          const sim = i === 0 ? pair.sim : 0.04 + (i * 0.035)
          const match = i === 0
          return (
            <div
              key={d}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                background: 'var(--panel-2)', border: `1px solid ${match ? 'var(--ok)' : 'var(--border)'}`,
                borderRadius: 10, padding: '9px 14px', fontSize: 13.5,
                animation: 'fadeInUp 0.4s ease both', animationDelay: `${i * 0.08}s`,
              }}
            >
              <span style={{ fontFamily: 'var(--mono)', width: 46, flexShrink: 0, fontWeight: 700, color: match ? 'var(--ok)' : 'var(--text-dim)' }}>
                {sim.toFixed(2)}
              </span>
              <div style={{ flex: 1, height: 8, borderRadius: 4, background: 'var(--border)', overflow: 'hidden' }}>
                <div style={{ width: `${sim * 100}%`, height: '100%', background: match ? 'var(--ok)' : 'var(--text-dim)', borderRadius: 4, transition: 'width 0.6s ease' }} />
              </div>
              <span style={{ color: match ? 'var(--text)' : 'var(--text-dim)', minWidth: 0 }}>{match && '✓ '}{d}</span>
            </div>
          )
        })}
      </div>
      <p style={{ marginTop: 10, fontSize: 13, color: 'var(--text-dim)' }}>
        👆 正确描述的相似度显著高于干扰项 —— 这就是 CLIP 学到的图文对齐能力。
      </p>
    </div>
  )
}
