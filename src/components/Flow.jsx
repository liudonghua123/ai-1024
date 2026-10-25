/**
 * 可复用流程图。
 * nodes: [{ title, desc, hot }]
 * arrows: [{ label }]  （长度 = nodes.length - 1）
 */
export default function Flow({ nodes, arrows = [], label }) {
  if (!nodes?.length) return null
  return (
    <div className="card">
      {label && (
        <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text-dim)', marginBottom: 6 }}>
          {label}
        </div>
      )}
      <div className="flow-wrap">
        <div className="flow">
          {nodes.map((n, i) => (
            <FlowNodeWithArrow key={i} node={n} index={i} arrow={arrows[i - 1]} />
          ))}
        </div>
      </div>
    </div>
  )
}

function FlowNodeWithArrow({ node, index, arrow }) {
  return (
    <>
      {index > 0 && (
        <div className="flow-arrow pulse">
          {arrow?.label && <span className="fa-label">{arrow.label}</span>}
          <span></span>
        </div>
      )}
      <div className={`flow-node ${node.hot ? 'hot' : ''}`}>
        <span className="fn-title">{node.title}</span>
        {node.desc && <span className="fn-desc">{node.desc}</span>}
      </div>
    </>
  )
}
