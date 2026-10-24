import { useState } from 'react'

const KNOWLEDGE = [
  { id: 0, doc: '产品手册 v3.pdf', chunk: 'AI-1024 便携版的电池续航为 18 小时，支持 65W 快充。', score: 0.93 },
  { id: 1, doc: 'FAQ.md', chunk: '续航问题：正常使用约 18 小时，重度使用约 9 小时。', score: 0.88 },
  { id: 2, doc: '发布会记录', chunk: '……电池方面我们采用了新型硅碳负极技术……', score: 0.71 },
  { id: 3, doc: '内部闲聊群.txt', chunk: '今天食堂的红烧肉绝了', score: 0.12 },
]

const STAGES = ['用户提问', '向量化', '检索知识库', '拼装 Prompt', 'LLM 生成', '带引用的回答']

/** RAG 检索演示：输入问题 → 模拟向量检索 → 展示命中文档与相关性分数 */
export default function RagPipelineDemo() {
  const [q, setQ] = useState('')
  const [stage, setStage] = useState(-1) // 当前流程阶段
  const [hits, setHits] = useState(null)
  const [answer, setAnswer] = useState('')

  const PRESETS = {
    '续航多久？': {
      hits: KNOWLEDGE,
      answer: '根据产品手册与 FAQ：AI-1024 便携版续航约 18 小时（重度使用约 9 小时），支持 65W 快充。📎 引用：产品手册 v3.pdf、FAQ.md',
    },
    '用什么电池技术？': {
      hits: [...KNOWLEDGE].sort((a, b) => (b.id === 2 ? 1 : 0) - (a.id === 2 ? 1 : 0) || a.score - b.score),
      answer: '发布会提到采用了新型硅碳负极电池技术。📎 引用：发布会记录',
    },
  }

  const run = (question) => {
    const query = question ?? q
    if (!query.trim()) return
    const preset = PRESETS[query] || {
      hits: [...KNOWLEDGE].sort((a, b) => b.score - a.score),
      answer: `知识库中没有找到与「${query}」直接相关的内容。这正是 RAG 的诚实之处：查不到就说查不到，而不是编一个。（当然，如果关掉 RAG 直接问 LLM，它可能就开编了。）`,
    }
    setQ(query)
    setHits(null)
    setAnswer('')
    setStage(0)
    const steps = [600, 700, 900, 700, 900]
    let acc = 0
    steps.forEach((d, i) => {
      acc += d
      setTimeout(() => setStage(i + 1), acc)
    })
    setTimeout(() => setHits(preset.hits), acc - 500)
    setTimeout(() => setAnswer(preset.answer), acc + 200)
  }

  return (
    <div className="card">
      <h3 className="sub-title">RAG 现场演示 · 提问 → 检索 → 有据可查的回答</h3>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && run()}
          placeholder="试试：续航多久？"
          style={{
            flex: 1, minWidth: 180, background: 'var(--panel-2)', color: 'var(--text)',
            border: '1px solid var(--border)', borderRadius: 10, padding: '10px 14px',
            fontSize: 14, fontFamily: 'var(--sans)', outline: 'none',
          }}
        />
        <button className="quiz-option" style={{ width: 'auto', margin: 0, padding: '10px 20px' }} onClick={() => run()}>
          🔍 提问
        </button>
        <button className="quiz-option" style={{ width: 'auto', margin: 0, padding: '10px 14px' }} onClick={() => run('续航多久？')}>
          续航多久？
        </button>
        <button className="quiz-option" style={{ width: 'auto', margin: 0, padding: '10px 14px' }} onClick={() => run('用什么电池技术？')}>
          电池技术？
        </button>
      </div>

      {/* 流程条 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 14 }}>
        {STAGES.map((s, i) => (
          <div
            key={s}
            style={{
              flex: 1, minWidth: 90, textAlign: 'center', fontSize: 11.5,
              padding: '7px 4px', borderRadius: 8, fontFamily: 'var(--mono)',
              background: stage >= i ? 'var(--panel-2)' : 'transparent',
              border: `1px solid ${stage === i ? 'var(--accent)' : 'var(--border)'}`,
              color: stage >= i ? 'var(--accent)' : 'var(--text-dim)',
              transition: 'all 0.3s',
            }}
          >
            {s}
          </div>
        ))}
      </div>

      {hits && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 6 }}>向量检索命中的知识片段（按相关性排序）：</div>
          {hits.map(h => (
            <div
              key={h.id}
              style={{
                display: 'flex', gap: 10, alignItems: 'center',
                background: h.score > 0.5 ? 'var(--panel-2)' : 'transparent',
                opacity: h.score > 0.5 ? 1 : 0.5,
                border: `1px solid ${h.score > 0.5 ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: 10, padding: '9px 13px', margin: '6px 0', fontSize: 13.5,
                animation: 'fadeInUp 0.4s ease both',
              }}
            >
              <span style={{ fontFamily: 'var(--mono)', color: h.score > 0.5 ? 'var(--ok)' : 'var(--text-dim)', fontWeight: 700, flexShrink: 0 }}>
                {h.score.toFixed(2)}
              </span>
              <span style={{ color: 'var(--text-dim)', flexShrink: 0, fontSize: 12 }}>{h.doc}</span>
              <span style={{ color: 'var(--text)' }}>{h.chunk}</span>
            </div>
          ))}
        </div>
      )}

      {answer && (
        <div className="callout ok" style={{ animation: 'fadeInUp 0.5s ease both' }}>
          <strong>🤖 回答：</strong>{answer}
        </div>
      )}
    </div>
  )
}
