import { useEffect, useRef, useState } from 'react'

const WORDS = ['The', 'cat', 'sat', 'on', 'the', 'mat', '.']
const WORDS_ZH = ['机器', '学习', '模型', '在', '数据', '中', '学习', '规律']

/**
 * 自注意力热力图：颜色越亮 = 注意力权重越高。
 * 悬停某行可高亮该 token 对其他 token 的注意力分布。
 */
export default function AttentionHeatmap() {
  const [hover, setHover] = useState(1)
  const [zh, setZh] = useState(true)
  const words = zh ? WORDS_ZH : WORDS

  // 生成一个看起来合理的伪注意力矩阵（对角线 + 邻近 + 少量远程依赖）
  const n = words.length
  const mat = useRef(null)
  if (!mat.current) {
    mat.current = Array.from({ length: n }, (_, i) =>
      Array.from({ length: n }, (_, j) => {
        const d = Math.abs(i - j)
        let w = Math.exp(-d / 2.2) * 0.8 + 0.05
        if (i === j) w += 0.3
        if ((i + j) % 7 === 0 && d > 2) w += 0.35 // 模拟长距离依赖
        return Math.min(w, 1)
      }),
    )
  }

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h3 className="sub-title" style={{ margin: 0 }}>自注意力热力图 · 点我看看注意力在看谁</h3>
        <button className="quiz-option" style={{ width: 'auto', padding: '6px 14px', margin: 0 }} onClick={() => setZh(!zh)}>
          {zh ? '切到英文' : '切到中文'}
        </button>
      </div>
      <p className="body-text">
        当模型读到「<strong style={{ color: 'var(--accent)' }}>{words[hover]}</strong>」时，它对其他词的关注度如下 ——
        越亮表示分配的注意力权重越大。这就是 Attention：每个词都能"环顾四周"，动态决定该参考谁。
      </p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ borderCollapse: 'collapse', margin: '10px auto', fontFamily: 'var(--mono)', fontSize: 12 }}>
          <thead>
            <tr>
              <th style={{ padding: '4px 8px', color: 'var(--text-dim)' }}>Q \ K</th>
              {words.map((w, j) => (
                <th key={j} style={{ padding: '4px 8px', color: hover === j ? 'var(--accent)' : 'var(--text-dim)' }}>{w}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mat.current.map((row, i) => (
              <tr key={i}>
                <td
                  onMouseEnter={() => setHover(i)}
                  style={{
                    padding: '4px 10px', cursor: 'pointer',
                    color: hover === i ? 'var(--accent)' : 'var(--text-dim)',
                    fontWeight: hover === i ? 700 : 400,
                  }}
                >
                  {words[i]}
                </td>
                {row.map((w, j) => (
                  <td key={j} style={{ padding: 0 }}>
                    <div
                      style={{
                        width: 44, height: 30, borderRadius: 4,
                        background: `rgba(var(--heat-rgb), ${(w * (i === hover ? 1 : 0.25)).toFixed(3)})`,
                        border: hover === i ? '1px solid rgba(var(--heat-rgb), 0.6)' : '1px solid transparent',
                        transition: 'background .3s',
                      }}
                      title={`${words[i]} → ${words[j]} : ${(w * 100).toFixed(0)}%`}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
