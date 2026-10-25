import { useState } from 'react'

/**
 * LoRA 原理动画：W (大矩阵冻结) + A·B (两个小矩阵可训练)。
 */
export default function LoraMatmul() {
  const [hover, setHover] = useState(null)

  const boxStyle = (key, color, label, sub, frozen) => (
    <div
      onMouseEnter={() => setHover(key)}
      onMouseLeave={() => setHover(null)}
      style={{
        textAlign: 'center', padding: '18px 20px', borderRadius: 12, cursor: 'default',
        border: `2px ${frozen ? 'dashed' : 'solid'} ${color}`,
        background: hover === key ? 'var(--panel-2)' : 'var(--panel)',
        transition: 'all 0.25s',
        transform: hover === key ? 'translateY(-4px)' : 'none',
      }}
    >
      <div style={{ fontFamily: 'var(--mono)', fontSize: 20, fontWeight: 700, color }}>{label}</div>
      <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 6, maxWidth: 150, lineHeight: 1.6 }}>{sub}</div>
      <div style={{ marginTop: 8, fontSize: 11, fontFamily: 'var(--mono)', color: frozen ? 'var(--text-dim)' : color }}>
        {frozen ? ' 冻结' : ' 可训练'}
      </div>
    </div>
  )

  return (
    <div className="card">
      <h3 className="sub-title">LoRA 低秩分解 · 悬停看每一块</h3>
      <p className="body-text">
        全参数微调 70B 模型要 700GB+ 显存存梯度。LoRA 的洞察：<strong>微调带来的权重变化是低秩的</strong>——
        冻结原矩阵 W，只训练两个小矩阵 A（d×r）和 B（r×d），r 通常只有 8~64。
        可训练参数直降 99%+，消费级显卡也能微调大模型。
      </p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, flexWrap: 'wrap', padding: '10px 0' }}>
        {boxStyle('W', 'var(--text-dim)', 'W ∈ ℝ⁴⁰⁹⁶ˣ⁴⁰⁹⁶', '原权重矩阵 1600 万参数', true)}
        <div style={{ fontSize: 26, color: 'var(--accent)', fontFamily: 'var(--mono)' }}>+</div>
        {boxStyle('A', 'var(--ok)', 'A ∈ ℝ⁴⁰⁹⁶ˣ⁸', '降维投影，仅 3.3 万参数', false)}
        <div style={{ fontSize: 26, color: 'var(--accent)', fontFamily: 'var(--mono)' }}>×</div>
        {boxStyle('B', 'var(--accent)', 'B ∈ ℝ⁸ˣ⁴⁰⁹⁶', '升维还原，仅 3.3 万参数', false)}
        <div style={{ fontSize: 26, color: 'var(--accent)', fontFamily: 'var(--mono)' }}>=</div>
        <div style={{ textAlign: 'center', padding: '14px 18px', borderRadius: 12, border: '2px solid var(--warn)', background: 'rgba(255,179,71,.06)' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 15, color: 'var(--warn)' }}>ΔW ≈ A·B</div>
          <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 6 }}>6.6 万参数<br />≈ 全量的 0.4%</div>
        </div>
      </div>
      <div className="callout ok">
        <strong>为什么有效？</strong> 微调只改"一小部分能力"（比如学会用某种格式说话），
        信息量不需要 1600 万参数的自由度。训练完可以把 A·B 合并回 W，<strong>推理零额外开销</strong>。
        同一个底座配多套 LoRA，就能一个模型扮演 N 个角色。
      </div>
    </div>
  )
}
