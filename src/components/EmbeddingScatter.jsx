import { useState } from 'react'

// 简化的 2D 语义空间：同类词聚在一起
const WORDS = [
  { w: '国王', x: 72, y: 30, g: 'royal', near: ['女王', '王子'] },
  { w: '女王', x: 80, y: 42, g: 'royal' },
  { w: '王子', x: 64, y: 40, g: 'royal' },
  { w: '猫', x: 25, y: 68, g: 'animal', near: ['狗', '老虎'] },
  { w: '狗', x: 18, y: 78, g: 'animal' },
  { w: '老虎', x: 32, y: 80, g: 'animal' },
  { w: '苹果', x: 78, y: 75, g: 'fruit', near: ['香蕉', '橘子'] },
  { w: '香蕉', x: 86, y: 84, g: 'fruit' },
  { w: '橘子', x: 70, y: 86, g: 'fruit' },
  { w: '代码', x: 20, y: 18, g: 'tech', near: ['程序', 'BUG'] },
  { w: '程序', x: 12, y: 28, g: 'tech' },
  { w: 'BUG', x: 28, y: 10, g: 'tech' },
]
const GROUP_COLOR = {
  royal: 'var(--accent-2)',
  animal: 'var(--ok)',
  fruit: 'var(--warn)',
  tech: 'var(--accent)',
}

/** 词向量散点图：点击词看它的最近邻连线 */
export default function EmbeddingScatter() {
  const [sel, setSel] = useState('国王')
  const word = WORDS.find(x => x.w === sel)
  const neighbors = word.near || []

  return (
    <div className="card">
      <h3 className="sub-title">语义空间地图 · 点一个词看它的"邻居"</h3>
      <p className="body-text">
        Embedding 把每个词变成一个高维向量（真实模型是几千维，这里压到 2 维可视化）。
        语义相近的词在空间中距离也近——「国王」和「女王」是邻居，和「香蕉」八竿子打不着。
        著名的 <strong>king − man + woman ≈ queen</strong> 就是这个空间里的向量运算。
      </p>
      <div
        style={{
          position: 'relative', height: 300, borderRadius: 12,
          border: '1px solid var(--border)', background: 'var(--panel-2)',
          overflow: 'hidden',
        }}
      >
        {/* 网格背景 */}
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
          <defs>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="var(--border)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* 邻居连线 */}
          {neighbors.map(nw => {
            const n = WORDS.find(x => x.w === nw)
            if (!n) return null
            return (
              <line
                key={nw} x1={`${word.x}%`} y1={`${word.y}%`} x2={`${n.x}%`} y2={`${n.y}%`}
                stroke={GROUP_COLOR[word.g]} strokeWidth="2" strokeDasharray="5 4"
                style={{ animation: 'dashFlow 1.2s linear infinite' }}
              />
            )
          })}
          <defs>
            <style>{`@keyframes dashFlow { to { stroke-dashoffset: -18; } }`}</style>
          </defs>
        </svg>
        {WORDS.map(item => {
          const isSel = item.w === sel
          const isNb = neighbors.includes(item.w)
          return (
            <button
              key={item.w}
              onClick={() => setSel(item.w)}
              style={{
                position: 'absolute', left: `${item.x}%`, top: `${item.y}%`,
                transform: 'translate(-50%, -50%)',
                background: isSel ? GROUP_COLOR[item.g] : 'var(--panel)',
                color: isSel ? '#fff' : isNb ? GROUP_COLOR[item.g] : 'var(--text-dim)',
                border: `1.5px solid ${isSel || isNb ? GROUP_COLOR[item.g] : 'var(--border)'}`,
                borderRadius: 20, padding: '4px 12px', cursor: 'pointer',
                fontSize: isSel ? 14 : 12.5, fontWeight: isSel ? 700 : 400,
                fontFamily: 'var(--sans)', transition: 'all 0.25s',
                boxShadow: isSel ? '0 4px 14px rgba(0,0,0,.25)' : 'none',
              }}
            >
              {item.w}
            </button>
          )
        })}
      </div>
      <p style={{ marginTop: 10, fontSize: 13, color: 'var(--text-dim)', fontFamily: 'var(--mono)' }}>
        当前选中：<strong style={{ color: GROUP_COLOR[word.g] }}>{word.w}</strong>
        （类别：{word.g}）→ 最近邻：{neighbors.join('、') || '无'}
      </p>
    </div>
  )
}
