import { NavLink } from 'react-router-dom'
import MatrixRain from '../components/MatrixRain.jsx'
import Flow from '../components/Flow.jsx'
import { PAPERS } from '../data/papers.js'

const SECTIONS = [
  {
    title: '地基：架构与表示',
    tagline: '一切的起点——注意力和向量',
    topics: [
      { to: '/transformer', icon: '🧲', title: 'Transformer', desc: '2017 年《Attention Is All You Need》，用注意力取代循环网络，成为一切的地基。' },
      { to: '/embedding', icon: '🗺️', title: 'Token 与 Embedding', desc: '文字怎么变成向量？语义空间里的几何魔法，万物皆可向量化的起点。' },
    ],
  },
  {
    title: '语言模型：从接龙到对齐',
    tagline: 'GPT 们是怎么炼成的',
    topics: [
      { to: '/llm', icon: '💬', title: 'LLM 大语言模型', desc: 'GPT / Claude / Gemini 的本质：超大号文字接龙机器 + Scaling Law。' },
      { to: '/rlhf', icon: '🎯', title: 'RLHF 对齐', desc: '人类反馈强化学习：模型怎么学会有用、诚实、无害地说话。' },
      { to: '/rag', icon: '📚', title: 'RAG 检索增强', desc: '先查资料再开口：让 LLM 开卷考试，知识可更新、答案可溯源。' },
    ],
  },
  {
    title: '视觉生成与多模态',
    tagline: '从 GAN 到 Sora 的图像叙事',
    topics: [
      { to: '/stable-diffusion', icon: '🎨', title: 'Stable Diffusion', desc: '文生图代表：把噪声一步步"炼"成图像，还藏在潜空间里省算力。' },
      { to: '/dit', icon: '🧩', title: 'DiT', desc: 'Diffusion Transformer：Sora 背后的骨架，扩散主干的 Transformer 化。' },
      { to: '/multimodal', icon: '🌉', title: '多模态与 CLIP', desc: '让图像和文字说同一种语言：双塔对比学习，零标注的跨模态对齐。' },
    ],
  },
  {
    title: '智能体：从会说到会做',
    tagline: '2025 之后的主战场',
    topics: [
      { to: '/agent', icon: '🤖', title: 'AI Agent', desc: '给大脑装上手脚：工具调用 + 记忆 + ReAct 循环，自主完成任务。' },
    ],
  },
]

const TIMELINE = [
  { year: '2012', event: 'AlexNet 引爆深度学习', to: '/papers' },
  { year: '2014', event: 'Attention / GAN / Seq2Seq', to: '/papers' },
  { year: '2017', event: 'Transformer 统一架构', to: '/transformer' },
  { year: '2020', event: 'GPT-3 + Scaling Laws', to: '/llm' },
  { year: '2022', event: 'SD / RLHF / CoT 三线齐爆', to: '/papers' },
  { year: '2024', event: '工程化与开源深水区', to: '/papers' },
]

export default function Home() {
  return (
    <div className="fade-in">
      <MatrixRain />
      <section className="hero">
        <div className="binary-line">01001000 01000001 01010000 01010000 01011001 · 1024</div>
        <h1 className="hero-title">1024 程序员节<br />AI 核心概念科普</h1>
        <p className="sub">
          不堆公式、不念论文。用动画、流程图和一点冷幽默，
          讲清楚 AI 的 {PAPERS.length} 篇经典论文与 9 个核心概念——
          从注意力机制到智能体，一条线串起大模型的技术全景。
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <NavLink to="/papers" className="hero-cta primary">🖼️ 进入论文墙 · 36 篇</NavLink>
          <NavLink to="/transformer" className="hero-cta">🧲 从地基开始读</NavLink>
        </div>
      </section>

      {/* 时间线 */}
      <h2 className="section-title">二十年技术演进</h2>
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
        <div key={sec.title}>
          <h2 className="section-title">{sec.title}</h2>
          <p style={{ color: 'var(--text-dim)', fontSize: 13.5, margin: '-8px 0 14px', fontFamily: 'var(--mono)' }}>
            {sec.tagline}
          </p>
          <div className="topic-grid">
            {sec.topics.map(t => (
              <NavLink key={t.to} to={t.to} className="topic-card">
                <div className="tc-icon">{t.icon}</div>
                <h3>{t.title}</h3>
                <p>{t.desc}</p>
                <span className="tc-go">开始阅读 →</span>
              </NavLink>
            ))}
          </div>
        </div>
      ))}

      {/* 技术主线 */}
      <h2 className="section-title">一条主线串起来</h2>
      <Flow
        label="技术主线（从地基到应用）"
        nodes={[
          { title: 'Transformer / Embedding', desc: '地基：架构与表示', hot: true },
          { title: 'LLM → RLHF', desc: '语言模型 + 对齐' },
          { title: 'RAG / Agent', desc: '知识增强与自主行动', hot: true },
          { title: 'SD → DiT / 多模态', desc: '视觉生成与跨模态' },
        ]}
        arrows={[{ label: '承重墙' }, { label: '学会说话' }, { label: '连接现实' }]}
      />

      <div className="callout warn" style={{ marginTop: 36 }}>
        <strong>为什么是 1024？</strong> 2¹⁰ = 1024，程序员最熟悉的数字之一（1 KB = 1024 B）。
        祝伟大的主人们：代码无 BUG，显存够用，loss 平稳收敛。🐾
      </div>
    </div>
  )
}
