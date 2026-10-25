import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTheme } from '../theme.jsx'
import Icon from './Icon.jsx'

const MENUS = [
  {
    group: '地基',
    items: [
      { to: '/transformer', label: 'Transformer', icon: 'transformer' },
      { to: '/embedding', label: 'Token 与 Embedding', icon: 'embedding' },
      { to: '/cnn', label: 'CNN 视觉革命', icon: 'cnn' },
      { to: '/pretrain', label: '预训练范式', icon: 'pretrain' },
    ],
  },
  {
    group: '语言模型',
    items: [
      { to: '/llm', label: 'LLM 大语言模型', icon: 'llm' },
      { to: '/scaling', label: 'Scaling Laws', icon: 'scaling' },
      { to: '/rlhf', label: 'RLHF 对齐', icon: 'rlhf' },
      { to: '/rag', label: 'RAG 检索增强', icon: 'rag' },
      { to: '/efficient', label: '高效训练与微调', icon: 'efficient' },
    ],
  },
  {
    group: '视觉与多模态',
    items: [
      { to: '/stable-diffusion', label: 'Stable Diffusion', icon: 'diffusion' },
      { to: '/dit', label: 'DiT', icon: 'dit' },
      { to: '/multimodal', label: '多模态与 CLIP', icon: 'multimodal' },
    ],
  },
  {
    group: '推理与智能体',
    items: [
      { to: '/cot', label: '思维链 CoT', icon: 'cot' },
      { to: '/agent', label: 'AI Agent', icon: 'agent' },
    ],
  },
]

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)

  const isGroupActive = group => group.items.some(i => location.hash.startsWith('#' + i.to))

  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-logo" onClick={() => setOpen(false)}>
        <Icon name="logo" size={26} style={{ color: 'var(--accent)' }} />
        <span>AI·1024<span style={{ fontSize: 11, color: 'var(--text-dim)', fontWeight: 400 }}>科普</span></span>
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
                  <Icon name={i.icon} size={19} style={{ color: 'var(--accent)' }} />
                  {i.label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 移动端：汉堡展开全部分组 */}
      <div className={`nav-links ${open ? 'open' : ''}`}>
        {MENUS.map(m => (
          <div key={m.group}>
            <div className="nav-group-label">{m.group}</div>
            {m.items.map(i => (
              <NavLink key={i.to} to={i.to} className={({ isActive }) => 'nav-link indent' + (isActive ? ' active' : '')} onClick={() => setOpen(false)}>
                <Icon name={i.icon} size={17} style={{ color: 'var(--accent)', marginRight: 7 }} />
                {i.label}
              </NavLink>
            ))}
          </div>
        ))}
      </div>

      <button className="theme-toggle" onClick={toggle} title={theme === 'dark' ? '切换到亮色模式' : '切换到暗色模式'} aria-label="切换主题">
        <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={20} />
      </button>
      <button className="nav-burger" onClick={() => setOpen(o => !o)} aria-label="菜单">
        <Icon name={open ? 'close' : 'menu'} size={20} />
      </button>
    </nav>
  )
}
