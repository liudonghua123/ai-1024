import { useEffect, useState } from 'react'

const STAGES = [
  { name: '全网抓取', n: '5 万亿 token', desc: 'Common Crawl 原始网页：色情、乱码、重复、垃圾内容混杂。', pct: 100, color: 'var(--accent-3)' },
  { name: '规则清洗', n: '≈ 2.4 万亿', desc: '去重（MinHash）、语言检测、广告/毒性过滤、质量打分。', pct: 48, color: 'var(--warn)' },
  { name: '模型过滤', n: '≈ 1.4 万亿', desc: '用快判别模型给每条打"教育价值分"，只留高质量。', pct: 28, color: 'var(--accent)' },
  { name: '混合配比', n: '≈ 1.2 万亿', desc: '代码 : 数学 : 多语言按黄金比例混入，防止短板。', pct: 24, color: 'var(--ok)' },
]

/**
 * 数据漏斗动画：5T → 1.2T 的提纯过程（RefinedWeb 思路）。
 */
export default function DataFunnel() {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const iv = setInterval(() => setStage(s => (s + 1) % (STAGES.length + 1)), 1600)
    return () => clearInterval(iv)
  }, [])

  return (
    <div className="card">
      <h3 className="sub-title">数据漏斗 · 5 万亿 token 如何提纯到 1.2 万亿</h3>
      <p className="body-text">
        「Garbage in, garbage out」。RefinedWeb 证明：<strong>不堆新数据，把清洗做到极致，
        纯网页数据也能训出顶尖模型</strong>。质量 &gt; 数量——但先得有数量的底子。
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
        {STAGES.map((s, i) => {
          const revealed = stage >= i
          const width = 30 + (s.pct / 100) * 70
          return (
            <div
              key={s.name}
              style={{
                margin: '0 auto', width: `${width}%`, minWidth: 280,
                background: `linear-gradient(90deg, ${s.color}22, transparent)`,
                border: `1.5px solid ${s.color}`,
                borderLeft: `6px solid ${s.color}`,
                borderRadius: 10, padding: '12px 16px',
                opacity: revealed ? 1 : 0, transform: revealed ? 'none' : 'translateY(14px)',
                transition: 'all 0.6s cubic-bezier(.4,0,.2,1)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 4 }}>
                <strong style={{ fontSize: 14 }}>{i + 1}. {s.name}</strong>
                <span style={{ fontFamily: 'var(--mono)', color: s.color, fontSize: 13 }}>{s.n}</span>
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--text-dim)', marginTop: 5, lineHeight: 1.6 }}>{s.desc}</div>
            </div>
          )
        })}
      </div>
      <p style={{ textAlign: 'center', marginTop: 12, fontSize: 13, color: 'var(--text-dim)' }}>
        保留率 <strong style={{ color: 'var(--ok)' }}>~24%</strong> —— 但这 1.2T 的质量，胜过 5T 的原始汤。
      </p>
    </div>
  )
}
