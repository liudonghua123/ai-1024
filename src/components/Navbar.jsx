import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTheme } from '../theme.jsx'

const LINKS = [
  { to: '/', label: '首页', end: true },
  { to: '/transformer', label: 'Transformer' },
  { to: '/llm', label: 'LLM' },
  { to: '/stable-diffusion', label: 'Stable Diffusion' },
  { to: '/dit', label: 'DiT' },
  { to: '/embedding', label: 'Embedding' },
  { to: '/rag', label: 'RAG' },
  { to: '/rlhf', label: 'RLHF' },
  { to: '/multimodal', label: '多模态' },
  { to: '/agent', label: 'Agent' },
]

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-logo" onClick={() => setOpen(false)}>
        🤖 AI·1024<span style={{ fontSize: 11, color: 'var(--text-dim)', fontWeight: 400 }}>科普</span>
      </NavLink>

      <div className={`nav-links ${open ? 'open' : ''}`}>
        {LINKS.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </NavLink>
        ))}
      </div>

      <button
        className="theme-toggle"
        onClick={toggle}
        title={theme === 'dark' ? '切换到亮色模式' : '切换到暗色模式'}
        aria-label="切换主题"
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>

      <button className="nav-burger" onClick={() => setOpen(o => !o)} aria-label="菜单">
        {open ? '✕' : '☰'}
      </button>
    </nav>
  )
}
