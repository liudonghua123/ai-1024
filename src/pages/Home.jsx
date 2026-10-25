import { NavLink } from 'react-router-dom'
import MatrixRain from '../components/MatrixRain.jsx'
import Flow from '../components/Flow.jsx'
import Icon, { IconBadge } from '../components/Icon.jsx'

const SECTIONS = [
  {
    title: '地基：架构与表示',
    tagline: '一切的起点——卷积、注意力和向量',
    topics: [
      { to: '/cnn', icon: 'cnn', title: 'CNN 视觉革命', desc: 'AlexNet 引爆、ResNet 破百层之壁、卷积如何看世界。', fresh: true },
      { to: '/transformer', icon: 'transformer', title: 'Transformer', desc: '2017 年《Attention Is All You Need》，用注意力取代循环网络。' },
      { to: '/embedding', icon: 'embedding', title: 'Token 与 Embedding', desc: '文字怎么变成向量？语义空间里的几何魔法。' },
      { to: '/pretrain', icon: 'pretrain', title: '预训练范式', desc: 'BERT vs GPT 两种完形填空，理解与生成的分岔路。', fresh: true },
    ],
  },
  {
    title: '语言模型：规模的艺术',
    tagline: '大力出奇迹的科学依据',
    topics: [
      { to: '/llm', icon: 'llm', title: 'LLM 大语言模型', desc: 'GPT 的本质：超大号文字接龙机器。' },
      { to: '/scaling', icon: 'scaling', title: 'Scaling Laws', desc: '幂律曲线、Chinchilla 修正与三堵墙。', fresh: true },
      { to: '/efficient', icon: 'efficient', title: '高效训练与微调', desc: 'ZeRO / MoE / LoRA / 蒸馏——算力的四两拨千斤。', fresh: true },
      { to: '/dataops', icon: 'rag', title: '数据工程', desc: '5 万亿 token 的提纯漏斗与数据配比的隐藏知识。', fresh: true },
    ],
  },
  {
    title: '对齐与应用',
    tagline: '从会说到会好好说',
    topics: [
      { to: '/rlhf', icon: 'rlhf', title: 'RLHF 对齐', desc: '人类反馈强化学习：有用、诚实、无害。' },
      { to: '/rag', icon: 'rag', title: 'RAG 检索增强', desc: '先查资料再开口：开卷考试可溯源。' },
    ],
  },
  {
    title: '视觉与多模态',
    tagline: '从 GAN 到 Sora 的图像叙事',
    topics: [
      { to: '/stable-diffusion', icon: 'diffusion', title: 'Stable Diffusion', desc: '把噪声一步步"炼"成图像，潜空间省算力。' },
      { to: '/dit', icon: 'dit', title: 'DiT', desc: 'Sora 背后的骨架：扩散主干的 Transformer 化。' },
      { to: '/multimodal', icon: 'multimodal', title: '多模态与 CLIP', desc: '双塔对比学习，图文说同一种语言。' },
    ],
  },
  {
    title: '推理与智能体',
    tagline: '2025 之后的主战场',
    topics: [
      { to: '/cot', icon: 'cot', title: '思维链 CoT', desc: '"一步一步想"如何变成 o1/R1 的训练范式。', fresh: true },
      { to: '/agent', icon: 'agent', title: 'AI Agent', desc: '工具调用 + 记忆 + ReAct 循环，从会说到会做。' },
    ],
  },
]

const TIMELINE = [
  { year: '2012', event: 'AlexNet 引爆深度学习', to: '/cnn' },
  { year: '2015', event: 'ResNet 破百层之壁', to: '/cnn' },
  { year: '2017', event: 'Transformer 统一架构', to: '/transformer' },
  { year: '2018', event: 'BERT vs GPT 分岔', to: '/pretrain' },
  { year: '2020', event: 'GPT-3 + Scaling Laws', to: '/scaling' },
  { year: '2022', event: 'SD / RLHF / CoT 三线齐爆', to: '/rlhf' },
  { year: '2024', event: '推理模型时代', to: '/cot' },
]

export default function Home() {
  const total = SECTIONS.reduce((n, s) => n + s.topics.length, 0)
  return (
    <div className="fade-in">
      <MatrixRain />
      <section className="hero">
        <div className="binary-line">01001000 01000001 01010000 01010000 01011001 · 1024</div>
        <h1 className="hero-title">1024 程序员节<br />AI 核心概念科普</h1>
        <p className="sub">
          不堆公式、不念论文。用动画、流程图和一点冷幽默，
          讲清楚 AI 的 {total} 个核心概念——从 AlexNet 到推理模型，一条线串起大模型的技术全景。
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <NavLink to="/transformer" className="hero-cta primary">从地基开始读</NavLink>
          <NavLink to="/cot" className="hero-cta">直达推理前沿</NavLink>
        </div>
      </section>

      {/* 时间线 */}
      <h2 className="section-title">十四年技术演进</h2>
      <div className="timeline">
        {TIMELINE.map(t => (
          <NavLink key={t.year} to={t.to} className="timeline-item">
            <span className="tl-year">{t.year}</span>
            <span className="tl-event">{t.event}</span>
          </NavLink>
        ))}
      </div>

      {/* 分板块 */}
      {SECTIONS.map(sec => (
        <div key={sec.title} className="reveal">
          <h2 className="section-title">{sec.title}</h2>
          <p style={{ color: 'var(--text-dim)', fontSize: 14, margin: '-8px 0 16px' }}>
            {sec.tagline}
          </p>
          <div className="topic-grid">
            {sec.topics.map((t, i) => (
              <NavLink key={t.to} to={t.to} className="topic-card" style={i % 2 === 1 ? { transform: 'translateY(16px)' } : undefined}>
                {t.fresh && <span className="tc-new">NEW</span>}
                <div className="tc-icon"><IconBadge name={t.icon} size={44} /></div>
                <h3>{t.title}</h3>
                <p>{t.desc}</p>
                <span className="tc-go">开始阅读 <Icon name="arrow" size={14} /></span>
              </NavLink>
            ))}
          </div>
        </div>
      ))}

      {/* 技术主线 */}
      <div className="reveal">
      <h2 className="section-title">一条主线串起来</h2>
      <Flow
        label="技术主线（从地基到前沿）"
        nodes={[
          { title: 'CNN → Transformer', desc: '视觉与语言的地基', hot: true },
          { title: '预训练 + Scaling', desc: '大力出奇迹' },
          { title: 'RLHF + RAG', desc: '对齐与知识增强' },
          { title: 'CoT / o1 → Agent', desc: '推理与自主行动', hot: true },
        ]}
        arrows={[{ label: '架构统一' }, { label: '能力涌现' }, { label: '连接现实' }]}
      />
      </div>

      <div className="callout warn" style={{ marginTop: 48 }}>
        <strong>为什么是 1024？</strong> 2¹⁰ = 1024，程序员最熟悉的数字之一（1 KB = 1024 B）。
        祝伟大的主人们：代码无 BUG，显存够用，loss 平稳收敛。
      </div>
    </div>
  )
}
