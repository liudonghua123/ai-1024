import { useState } from 'react'

const EXPERTS = ['语法专家', '代码专家', '数学专家', '常识专家', '历史专家', '生物专家', '翻译专家', '化学专家']
const QUERIES = [
  { q: '用 Python 写个爬虫', winner: 1 },
  { q: '证明 √2 是无理数', winner: 2 },
  { q: '明朝的开国皇帝是谁？', winner: 4 },
  { q: 'DNA 复制发生在细胞哪个阶段？', winner: 7 },
]

/**
 * MoE 路由动画：输入 token，Router 只点亮 2 个专家。
 */
export default function MoERouter() {
  const [sel, setSel] = useState(0)
  const q = QUERIES[sel]

  return (
    <div className="card">
      <h3 className="sub-title">MoE 稀疏路由 · 万亿参数只激活一小撮</h3>
      <p className="body-text">
        稠密模型（GPT-3）每个 token 都要过全部参数；<strong>MoE（混合专家）</strong>把前馈层换成多个"专家"，
        由 Router 给每个 token 挑 2 个最合适的。参数量可以堆到万亿，计算量却不变——
        DeepSeek-V3、Mixtral 的心脏。
      </p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
        {QUERIES.map((item, i) => (
          <button key={i} className="quiz-option" style={{ width: 'auto', margin: 0, padding: '7px 14px', borderColor: i === sel ? 'var(--accent)' : undefined, color: i === sel ? 'var(--accent)' : undefined }} onClick={() => setSel(i)}>
            {item.q}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 6 }}>输入 token</div>
          <div style={{ padding: '12px 16px', borderRadius: 12, background: 'var(--panel-2)', border: '1.5px solid var(--accent)', fontFamily: 'var(--sans)', fontSize: 14, maxWidth: 170 }}>
            {q.q}
          </div>
        </div>

        <svg width="60" height="40" viewBox="0 0 60 40">
          <path d="M4 20 C 20 20, 38 20, 56 20" stroke="var(--accent-2)" strokeWidth="2.5" fill="none" strokeDasharray="6 5" style={{ animation: 'dashFlow 1s linear infinite' }} />
          <polygon points="56,20 48,15 48,25" fill="var(--accent-2)" />
          <style>{`@keyframes dashFlow { to { stroke-dashoffset: -11; } }`}</style>
        </svg>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 6 }}>Router 打分</div>
          <div style={{ padding: '10px 14px', borderRadius: 12, border: '1.5px dashed var(--accent-2)', fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--accent-2)' }}>
            softmax(W·x)
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 8, marginTop: 16 }}>
        {EXPERTS.map((e, i) => {
          const active = i === q.winner || i === (q.winner + 3) % EXPERTS.length
          return (
            <div
              key={e}
              style={{
                textAlign: 'center', padding: '12px 6px', borderRadius: 10, fontSize: 12.5,
                border: `1.5px solid ${active ? 'var(--ok)' : 'var(--border)'}`,
                background: active ? 'rgba(61,220,132,.1)' : 'var(--panel)',
                color: active ? 'var(--ok)' : 'var(--text-dim)',
                fontWeight: active ? 700 : 400,
                opacity: active ? 1 : 0.45,
                transition: 'all 0.4s',
              }}
            >
              {active ? '·'  : ''}{e}
              {active && <div style={{ fontSize: 10, marginTop: 3, fontFamily: 'var(--mono)' }}>被激活</div>}
            </div>
          )
        })}
      </div>
      <p style={{ marginTop: 12, fontSize: 13, color: 'var(--text-dim)', textAlign: 'center' }}>
        8 个专家只激活 <strong style={{ color: 'var(--ok)' }}>2 个</strong>（Top-2 路由）——计算量 ≈ 1/4，参数容量不缩水。
      </p>
    </div>
  )
}
