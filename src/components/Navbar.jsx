import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTheme } from '../theme.jsx'

const MENUS = [
  {
    group: '地基',
    items: [
      { to: '/transformer', label: 'Transformer', icon: '🧲' },
      { to: '/embedding', label: 'Token 与 Embedding', icon: '🗺️' },
    ],
  },
  {
    group: '语言模型',
    items: [
      { to: '/llm', label: 'LLM 大语言模型', icon: '💬' },
      { to: '/rlhf', label: 'RLHF 对齐', icon: '🎯' },
      { to: '/rag', label: 'RAG 检索增强', icon: '📚' },
    ],
  },
  {
    group: '视觉与多模态',
    items: [
      { to: '/stable-diffusion', label: 'Stable Diffusion', icon: '🎨' },
      { to: '/dit', label: 'DiT', icon: '🧩' },
      { to: '/multimodal', label: '多模态与 CLIP', icon: '🌉' },
    ],
  },
  {
    group: '智能体',
    items: [{ to: '/agent', label: 'AI Agent', icon: '🤖' }],
  },
]

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)

  const isGroupActive = group => group.items.some(i => location.hash.startsWith('#' + i.to))

  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-logo" onClick={() => setOpen(false)}>
        🤖 AI·1024<span style={{ fontSize: 11, color: 'var(--text-dim)', fontWeight: 400 }}>科普</span>
      </NavLink>

      {/* 桌面端：分组下拉 */}
      <div className="nav-desktop">
        {MENUS.map(m => (
          <div key={m.group} className="nav-group">
            <button className={`nav-group-btn ${isGroupActive(m) ? 'active' : ''}`}>
              {m.group} <span style={{ fontSize: 10 }}>▾</span>
            </button>
            <div className="nav-dropdown">
              {m.items.map(i => (
                <NavLink key={i.to} to={i.to} className={({ isActive }) => 'nav-drop-item' + (isActive ? ' active' : '')}>
                  <span>{i.icon}</span> {i.label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
        <NavLink to="/papers" className={({ isActive }) => 'nav-link big' + (isActive ? ' active' : '')}>
          🖼️ 论文墙
        </NavLink>
      </div>

      {/* 移动端：汉堡展开全部分组 */}
      <div className={`nav-links ${open ? 'open' : ''}`}>
        <NavLink to="/papers" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} onClick={() => setOpen(false)}>
          🖼️ 论文墙 · 36 篇
        </NavLink>
        {MENUS.map(m => (
          <div key={m.group}>
            <div className="nav-group-label">{m.group}</div>
            {m.items.map(i => (
              <NavLink key={i.to} to={i.to} className={({ isActive }) => 'nav-link indent' + (isActive ? ' active' : '')} onClick={() => setOpen(false)}>
                {i.icon} {i.label}
              </NavLink>
            ))}
          </div>
        ))}
      </div>

      <button className="theme-toggle" onClick={toggle} title={theme === 'dark' ? '切换到亮色模式' : '切换到暗色模式'} aria-label="切换主题">
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
      <button className="nav-burger" onClick={() => setOpen(o => !o)} aria-label="菜单">
        {open ? '✕' : '☰'}
      </button>
    </nav>
  )
}
