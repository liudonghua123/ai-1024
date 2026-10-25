import Icon from './Icon.jsx'

/** 主题页统一标题：动态 SVG 图标 + 标题 */
export default function PageTitle({ icon, children }) {
  return (
    <div className="page-head">
      <span className="page-head-icon" style={{ color: 'var(--accent)' }}>
        <Icon name={icon} size={40} />
      </span>
      <h1 className="hero-title" style={{ fontSize: 'clamp(26px,4vw,40px)', margin: 0 }}>{children}</h1>
    </div>
  )
}
