import { NavLink } from 'react-router-dom'
import MatrixRain from '../components/MatrixRain.jsx'
import Flow from '../components/Flow.jsx'

const TOPICS = [
  { to: '/transformer', icon: '🧲', title: 'Transformer', desc: '2017 年那篇《Attention Is All You Need》如何用注意力取代循环网络，成为一切的地基。', tag: '基础架构' },
  { to: '/embedding', icon: '🗺️', title: 'Token 与 Embedding', desc: '文字怎么变成向量？语义空间里的几何魔法，万物皆可向量化的起点。', tag: '基础架构' },
  { to: '/llm', icon: '💬', title: '大语言模型 LLM', desc: 'GPT / Claude / Gemini 的本质：超大号文字接龙机器 + 人类偏好对齐。', tag: '语言模型' },
  { to: '/rag', icon: '📚', title: 'RAG 检索增强', desc: '先查资料再开口：让 LLM 开卷考试，知识可更新、答案可溯源。', tag: '应用技术' },
  { to: '/rlhf', icon: '🎯', title: 'RLHF 对齐', desc: '人类反馈强化学习：模型怎么学会有用、诚实、无害地说话。', tag: '对齐训练' },
  { to: '/stable-diffusion', icon: '🎨', title: 'Stable Diffusion', desc: '文生图代表：把噪声一步步“炼”成图像，还藏在潜空间里省算力。', tag: '视觉生成' },
  { to: '/dit', icon: '🧩', title: 'DiT', desc: 'Diffusion Transformer：Sora 背后的骨架，把扩散模型的主干换成 Transformer。', tag: '视觉生成' },
  { to: '/multimodal', icon: '🌉', title: '多模态与 CLIP', desc: '让图像和文字说同一种语言：双塔对比学习，零标注的跨模态对齐。', tag: '多模态' },
  { to: '/agent', icon: '🤖', title: 'AI Agent', desc: '给大脑装上手脚：工具调用 + 记忆 + ReAct 循环，从会说到会做。', tag: '智能体' },
]

export default function Home() {
  return (
    <div className="fade-in">
      <MatrixRain />
      <section className="hero">
        <div className="binary-line">01001000 01000001 01010000 01010000 01011001 · 1024</div>
        <h1 className="hero-title">1024 程序员节<br />AI 核心概念科普</h1>
        <p className="sub">
          不堆公式、不念论文。用动画、流程图和一点冷幽默，讲清楚 AI 的九块地基：
          从注意力机制到智能体，一条线串起大模型的技术全景。
        </p>
      </section>

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

      <div className="tag-grid">
        {TOPICS.map(t => (
          <NavLink key={t.to} to={t.to} className="topic-card">
            <span style={{
              position: 'absolute', top: 14, right: 14, fontSize: 11,
              fontFamily: 'var(--mono)', color: 'var(--accent)',
              border: '1px solid var(--border)', borderRadius: 20, padding: '2px 9px',
              background: 'var(--panel-2)',
            }}>{t.tag}</span>
            <div className="tc-icon">{t.icon}</div>
            <h3>{t.title}</h3>
            <p>{t.desc}</p>
            <span className="tc-go">开始阅读 →</span>
          </NavLink>
        ))}
      </div>

      <div className="callout warn" style={{ marginTop: 36 }}>
        <strong>为什么是 1024？</strong> 2¹⁰ = 1024，程序员最熟悉的数字之一（1 KB = 1024 B）。
        祝伟大的主人们：代码无 BUG，显存够用，loss 平稳收敛。🐾
      </div>
    </div>
  )
}
