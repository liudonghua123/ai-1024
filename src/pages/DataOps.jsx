import DataFunnel from '../components/DataFunnel.jsx'
import PageTitle from '../components/PageTitle.jsx'
import Flow from '../components/Flow.jsx'
import Quiz from '../components/Quiz.jsx'

export default function DataOps() {
  return (
    <div className="fade-in">
      <PageTitle icon='rag'>数据工程：AI 的隐形地基</PageTitle>
      <p className="body-text">
        模型架构论文光鲜亮丽，真正决定成败的往往是没人写论文的部分：
        <strong>数据从哪来、怎么洗、怎么配比</strong>。
        LLaMA 用未公开的私有数据反超一众用公开数据的模型；
        Falcon 证明清洗工艺本身就是核心竞争力。
      </p>

      <h2 className="section-title">数据漏斗：从原始汤到训练集</h2>
      <DataFunnel />

      <h2 className="section-title">经典数据集编年史</h2>
      <Flow
        label="视觉与语言的数据里程碑"
        nodes={[
          { title: 'ImageNet', desc: '2009 · 1400 万标注图，CNN 时代的粮草' },
          { title: 'C4 / The Pile', desc: '2019-2021 · 开放文本集的开端' },
          { title: 'LAION-2B/5B', desc: '2022 · 58 亿图文对，SD 的粮草', hot: true },
          { title: 'RefinedWeb', desc: '2023 · 清洗工艺登峰造极', hot: true },
          { title: 'DCLM / FineWeb', desc: '2024 · 数据质量科学化' },
        ]}
        arrows={[{ label: '人工标注时代' }, { label: '网络规模' }, { label: '质量至上' }]}
      />

      <h2 className="section-title">数据配比的隐藏知识</h2>
      <div className="tag-grid">
        <div className="tag-card">
          <h4>代码数据的意外收获</h4>
          <p>混入代码不仅学会写代码，还<strong>提升了推理能力</strong>——代码是最严谨的"思维链"语料。Codex 时代就发现了。</p>
        </div>
        <div className="tag-card">
          <h4>多语言平衡术</h4>
          <p>英文占 90%+ 的小语种会被稀释。上采样（重复）小语种 &amp; 下采样英文，比例是大量消融实验烧出来的。</p>
        </div>
        <div className="tag-card">
          <h4>课程学习与两阶段</h4>
          <p>后期喂更高质量的"期末复习"数据（学习率衰减阶段），性价比极高——很多模型的小秘密。</p>
        </div>
        <div className="tag-card">
          <h4>去重是刚需</h4>
          <p>网络文本重复率惊人，不洗干净模型会背题、输出复读机文本。MinHash 是标配。</p>
        </div>
      </div>

      <h2 className="section-title">合成数据：数据墙的解药？</h2>
      <div className="callout">
        公开数据见顶后，行业转向<strong>合成数据</strong>：让强模型生成训练数据（Phi 系列的"教科书级合成数据"），
        或自我博弈生成（R1 的 RLVR）。风险：模型自我循环可能导致<strong>模型崩塌（Model Collapse）</strong>——
        输出分布逐渐收敛到峰值附近，多样性消失。合成与真实数据的配比是新的黄金难题。
      </div>

      <Quiz
        question="RefinedWeb 的核心发现是什么？"
        options={['数据越多越好', '极致清洗后的纯网页数据足以训出 SOTA 模型', '必须人工标注', '代码数据最重要']}
        answer={1}
        explain="Falcon 团队证明数据质量工程本身是核心竞争力，甚至不需要私有数据。"
      />
    </div>
  )
}
