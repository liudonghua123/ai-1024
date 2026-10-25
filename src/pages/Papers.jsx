import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PAPERS, CATS } from '../data/papers.js'

/** 论文墙：36 篇改变 AI 的经典论文 */
export default function Papers() {
  const [cat, setCat] = useState('all')
  const [active, setActive] = useState(null)
  const nav = useNavigate()

  const shown = cat === 'all' ? PAPERS : PAPERS.filter(p => p.cat === cat)
  const paper = active && PAPERS.find(p => p.name === active)

  // 按年代排序展示
  const sorted = [...shown].sort((a, b) => a.year - b.year)

  return (
    <div className="fade-in">
      <h1 className="hero-title" style={{ fontSize: 'clamp(26px,4vw,40px)' }}>🖼️ 论文墙：改变 AI 的 36 篇</h1>
      <p className="body-text">
        从 2004 年的 Brook 到 2024 年的 MegaScale，二十年技术演进浓缩成一堵墙。
        每个图块都是一座里程碑——<strong>点击图块看它做了什么</strong>，
        标亮边框的论文在本站有对应的互动科普页面。
      </p>

      {/* 分类筛选 */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '18px 0 8px' }}>
        <FilterBtn label={`全部 ${PAPERS.length}`} on={cat === 'all'} onClick={() => setCat('all')} color="var(--accent)" />
        {Object.entries(CATS).map(([key, c]) => (
          <FilterBtn
            key={key}
            label={`${c.icon} ${c.name} ${PAPERS.filter(p => p.cat === key).length}`}
            on={cat === key}
            onClick={() => setCat(key)}
            color={c.color}
          />
        ))}
      </div>

      {/* 论文墙 */}
      <div className="paper-wall">
        {sorted.map(p => {
          const c = CATS[p.cat]
          const isHot = !!p.link
          return (
            <button
              key={p.name}
              className={`paper-tile ${p.hot ? 'paper-hot' : ''}`}
              style={{ '--tile-color': c.color }}
              onClick={() => setActive(p.name)}
              title={`${p.name} · ${p.year}`}
            >
              <span className="pt-glyph">{p.glyph.length <= 4 ? p.glyph : p.glyph.slice(0, 4)}</span>
              <span className="pt-name">{p.name}</span>
              <span className="pt-year">{p.year}</span>
              {isHot && <span className="pt-badge" onClick={e => { e.stopPropagation(); nav(p.link) }}>📖 科普页</span>}
            </button>
          )
        })}
      </div>

      {/* 详情弹层 */}
      {paper && (
        <div className="paper-modal-mask" onClick={() => setActive(null)}>
          <div className="paper-modal" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: CATS[paper.cat].color }}>
                  {CATS[paper.cat].icon} {CATS[paper.cat].name} · {paper.year}
                </div>
                <h3 style={{ fontSize: 22, margin: '4px 0 10px' }}>{paper.name}</h3>
              </div>
              <button className="theme-toggle" style={{ width: 34, height: 34, fontSize: 15 }} onClick={() => setActive(null)}>✕</button>
            </div>
            <p className="body-text" style={{ marginBottom: 16 }}>{paper.desc}</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {paper.link && (
                <button className="quiz-option" style={{ width: 'auto', margin: 0, padding: '9px 20px', borderColor: 'var(--accent)', color: 'var(--accent)' }} onClick={() => nav(paper.link)}>
                  📖 去看互动科普 →
                </button>
              )}
              <button
                className="quiz-option"
                style={{ width: 'auto', margin: 0, padding: '9px 20px' }}
                onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(paper.name + ' paper ' + paper.year)}`)}
              >
                🔍 搜索原论文
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="callout">
        <strong>观察这条时间线</strong>：2012 AlexNet 引爆深度学习 → 2017 Transformer 统一架构 →
        2020 Scaling Laws + GPT-3 定调"大力出奇迹" → 2022 扩散模型 + RLHF + CoT 三线齐爆 →
        2024 进入工程化与开源深水区。<strong>现在你知道为什么说"论文里的一个人出现了 6 次"—— 那是 Ilya Sutskever。</strong>
      </div>
    </div>
  )
}

function FilterBtn({ label, on, onClick, color }) {
  return (
    <button
      onClick={onClick}
      style={{
        cursor: 'pointer', fontSize: 13, padding: '7px 16px', borderRadius: 20,
        fontFamily: 'var(--sans)',
        border: `1.5px solid ${on ? color : 'var(--border)'}`,
        background: on ? 'var(--panel-2)' : 'var(--panel)',
        color: on ? color : 'var(--text-dim)',
        fontWeight: on ? 700 : 400,
        transition: 'all 0.2s',
      }}
    >
      {label}
    </button>
  )
}
