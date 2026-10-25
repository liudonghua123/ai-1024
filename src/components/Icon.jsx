/**
 * Icon 动态 SVG 图标系统
 * 每个图标是该概念的微型示意图，自带 CSS 动画（hover 加速）。
 * 用法：<Icon name="transformer" size={22} />
 */

const A = {
  draw: 'icon-draw', pulse: 'icon-pulse', spin: 'icon-spin',
  blink: 'icon-blink', flow: 'icon-flow', bounce: 'icon-bounce',
}

const ICONS = {
  logo: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {/* 机器人头 */}
      <rect x="5" y="8" width="14" height="10" rx="3" />
      <circle className={A.blink} cx="9.5" cy="13" r="1.3" fill="currentColor" stroke="none" />
      <circle className={A.blink} cx="14.5" cy="13" r="1.3" fill="currentColor" stroke="none" style={{ animationDelay: '.4s' }} />
      <path d="M10 15.8c1.2 1 2.8 1 4 0" />
      <path className={A.pulse} d="M12 8V4.5" />
      <circle className={A.pulse} cx="12" cy="3.5" r="1.1" fill="currentColor" stroke="none" />
      <path d="M5 12H3M21 12h-2" />
    </g>
  ),

  transformer: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      {/* 注意力网络：中心节点向外辐射，连线脉冲 */}
      <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none" />
      <circle cx="4.5" cy="5.5" r="1.6" /><circle cx="19.5" cy="5.5" r="1.6" />
      <circle cx="4.5" cy="18.5" r="1.6" /><circle cx="19.5" cy="18.5" r="1.6" />
      <path className={A.pulse} d="M6 6.5L10 10.5M18 6.5L14 10.5M6 17.5L10 13.5M18 17.5L14 13.5" strokeDasharray="2 2.5" />
    </g>
  ),

  embedding: (
    <g fill="currentColor" stroke="none">
      {/* 语义空间散点 + 聚类 */}
      <circle cx="7" cy="7" r="1.7" className={A.pulse} />
      <circle cx="10" cy="9.5" r="1.2" opacity=".8" />
      <circle cx="6" cy="11" r="1.2" opacity=".8" />
      <circle cx="17" cy="6.5" r="1.7" className={A.pulse} style={{ animationDelay: '.5s' }} />
      <circle cx="18.5" cy="10" r="1.2" opacity=".8" />
      <circle cx="8" cy="17.5" r="1.7" className={A.pulse} style={{ animationDelay: '1s' }} />
      <circle cx="11.5" cy="18.5" r="1.2" opacity=".8" />
      <circle cx="17.5" cy="17" r="1.2" opacity=".8" />
    </g>
  ),

  cnn: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      {/* 卷积核在网格上滑动 */}
      <rect x="3" y="3" width="18" height="18" rx="2" opacity=".35" strokeDasharray="2.5 2.5" />
      <rect className={A.draw} x="7" y="7" width="8" height="8" rx="1.5" strokeWidth="2.2" />
      <path d="M9.5 11h3M11 9.5v3" />
    </g>
  ),

  pretrain: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {/* 打开的书 + 遮罩词块 */}
      <path d="M12 6.5C10.5 5 8 4.5 4.5 5v13c3.5-.5 6 0 7.5 1.5 1.5-1.5 4-2 7.5-1.5V5C16 4.5 13.5 5 12 6.5z" />
      <path d="M12 6.5v13" />
      <rect className={A.blink} x="8" y="10" width="3" height="1.6" fill="currentColor" stroke="none" rx=".5" />
      <rect x="13" y="10" width="3" height="1.6" fill="currentColor" stroke="none" opacity=".45" rx=".5" />
    </g>
  ),

  llm: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      {/* 文字流：光标打字 */}
      <rect x="3" y="5" width="18" height="13" rx="3" />
      <path d="M7 9.5h6M7 13h4" opacity=".6" />
      <path className={A.blink} d="M13 13h2.5" strokeWidth="2.4" />
    </g>
  ),

  scaling: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      {/* 幂律下降曲线 + 坐标轴 */}
      <path d="M4 4v16h16" opacity=".45" />
      <path className={A.draw} d="M5 6c5 0 9 2 12 8 1 2 2 4 2.5 5.5" strokeWidth="2.4" />
      <circle className={A.pulse} cx="19.5" cy="19.5" r="1.4" fill="currentColor" stroke="none" />
    </g>
  ),

  rlhf: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8">
      {/* 靶心：奖励信号 */}
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" opacity=".6" />
      <circle className={A.pulse} cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </g>
  ),

  rag: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {/* 文档 + 放大检索 */}
      <path d="M6 3.5h8l4 4V17a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5.5a2 2 0 0 1 2-2z" />
      <path d="M14 3.5v4h4" opacity=".6" />
      <circle cx="11" cy="12" r="2.6" />
      <path className={A.draw} d="M13 14l3 3" />
    </g>
  ),

  efficient: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      {/* 芯片 + 激活的核 */}
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <rect className={A.pulse} x="10" y="10" width="4" height="4" fill="currentColor" stroke="none" rx="1" />
      <path d="M10 7V4M14 7V4M10 20v-3M14 20v-3M7 10H4M7 14H4M20 10h-3M20 14h-3" opacity=".7" />
    </g>
  ),

  diffusion: (
    <g fill="currentColor" stroke="none">
      {/* 噪声点 → 聚合成形 */}
      <circle cx="5" cy="6" r="1.2" className={A.pulse} />
      <circle cx="10" cy="4.5" r="1" opacity=".7" className={A.pulse} style={{ animationDelay: '.3s' }} />
      <circle cx="15" cy="6" r="1.2" className={A.pulse} style={{ animationDelay: '.6s' }} />
      <circle cx="19.5" cy="5" r="1" opacity=".7" />
      <circle cx="5" cy="12" r="1" opacity=".7" />
      <circle className={A.pulse} cx="12" cy="12" r="2" style={{ animationDelay: '.2s' }} />
      <circle cx="19" cy="12" r="1.2" className={A.pulse} style={{ animationDelay: '.9s' }} />
      <circle cx="6" cy="18" r="1.2" opacity=".7" />
      <circle cx="11" cy="19" r="1" className={A.pulse} style={{ animationDelay: '.4s' }} />
      <circle cx="17" cy="18.5" r="1.2" opacity=".8" />
    </g>
  ),

  dit: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      {/* patch 网格 + 注意力连线 */}
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" className={A.pulse} />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" opacity=".55" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" opacity=".55" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" className={A.pulse} style={{ animationDelay: '.6s' }} />
      <path d="M10.5 7.2h3M7.2 10.5v3" opacity=".5" strokeDasharray="1.5 2" />
    </g>
  ),

  multimodal: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      {/* 双塔桥接：图文对齐 */}
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <path d="M6 14.5c.8-1.2 2.2-1.2 3 0" />
      <circle cx="7.5" cy="12.5" r=".9" fill="currentColor" stroke="none" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" opacity=".55" />
      <path d="M15 7h3M15 8.8h2" opacity=".6" />
      <path className={A.flow} d="M11.5 16.5h1" strokeWidth="2.4" />
      <path className={A.flow} d="M13 16.5h2" strokeWidth="2.4" style={{ animationDelay: '.25s' }} />
      <path className={A.flow} d="M15.5 16.5h1" strokeWidth="2.4" style={{ animationDelay: '.5s' }} />
    </g>
  ),

  cot: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      {/* 思维链：三环相扣 */}
      <circle cx="5.5" cy="12" r="2.6" />
      <circle cx="12" cy="12" r="2.6" className={A.pulse} />
      <circle cx="18.5" cy="12" r="2.6" />
      <path d="M8.1 12h1.3M14.6 12h1.3" />
    </g>
  ),

  agent: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {/* 循环箭头 + 核心 */}
      <path className={A.spinSlow} d="M19 12a7 7 0 1 1-2.05-4.95" />
      <path d="M19.5 3.5v4h-4" />
      <circle className={A.pulse} cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
    </g>
  ),

  sun: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="4.2" />
      <path className={A.spinSlow} d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6L18 18M18 6l-1.4 1.4M7.4 16.6L6 18" />
    </g>
  ),

  moon: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path className={A.draw} d="M20 13.5A8.5 8.5 0 0 1 10.5 4 7.5 7.5 0 1 0 20 13.5z" />
      <circle className={A.pulse} cx="17" cy="5.5" r="0.9" fill="currentColor" stroke="none" />
    </g>
  ),

  menu: (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M4 7h16" /><path className={A.draw} d="M4 12h12" /><path d="M4 17h16" />
    </g>
  ),

  close: (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path className={A.draw} d="M6 6l12 12M18 6L6 18" />
    </g>
  ),

  arrow: (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h13" /><path className={A.draw} d="M13 6.5L18.5 12 13 17.5" />
    </g>
  ),

  quiz: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 9a2.6 2.6 0 1 1 3.8 2.3c-.8.4-1.3 1-1.3 1.9v.4" />
      <circle className={A.pulse} cx="12" cy="17" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="9" opacity=".45" strokeDasharray="3 3.5" />
    </g>
  ),
}

export default function Icon({ name, size = 22, className = '', style }) {
  const glyph = ICONS[name]
  if (!glyph) return null
  return (
    <svg
      className={`icon ${className}`}
      width={size} height={size} viewBox="0 0 24 24"
      style={style} aria-hidden="true" focusable="false"
    >
      {glyph}
    </svg>
  )
}

export function IconBadge({ name, size = 44, color = 'var(--accent)' }) {
  return (
    <span className="icon-badge" style={{ color, width: size, height: size }}>
      <Icon name={name} size={Math.round(size * 0.58)} />
    </span>
  )
}
