import ScalingCurve from '../components/ScalingCurve.jsx'
import PageTitle from '../components/PageTitle.jsx'
import Quiz from '../components/Quiz.jsx'

const CodeScaling = `# Chinchilla 最优配比：给定算力预算 C
# 经验法则：参数量 N 和数据量 D 满足
#   N_opt ∝ C^0.5,  D_opt ∝ C^0.5  → N ≈ 20 × D(B token)
# 即：每个参数大约要喂 20 个 token

def chinchilla_compute(N_params, D_tokens):
    """近似算力估算 (Hoffmann et al. 2022)"""
    return 6 * N_params * D_tokens   # FLOPs ≈ 6ND

# 例：70B 模型 → 最优数据 ≈ 1.4T token
# 算力 ≈ 6 * 7e10 * 1.4e12 = 5.9e23 FLOPs
# 对比 GPT-3: 175B 参数只喂了 0.3T → 严重"参数过肥，数据过瘦"`

export default function Scaling() {
  return (
    <div className="fade-in">
      <PageTitle icon='scaling'>Scaling Laws：大力出奇迹的科学依据</PageTitle>
      <p className="body-text">
        2020 年 OpenAI 的《Scaling Laws for Neural Language Models》回答了一个值千亿美元的问题：
        <strong>模型性能随规模如何变化？</strong> 答案：幂律——平滑、可预测、
        在双对数坐标下是直线。这把"堆资源"从玄学变成了可核算的工程。
      </p>

      <h2 className="section-title">三条幂律曲线</h2>
      <ScalingCurve />

      <h2 className="section-title">三个关键结论</h2>
      <div className="steps">
        <div className="step-item"><strong>性能可预测</strong>：训小模型测出曲线斜率，就能外推大模型的最终 loss——GPT-4 的性能在训完前就被预测过（传称用了规模外推）。</div>
        <div className="step-item"><strong>三要素要同比放大</strong>：参数、数据、算力按比例同步增长，只堆一个是浪费。</div>
        <div className="step-item"><strong>涌现（Emergence）</strong>：大部分能力平滑提升，但少数能力（算术、in-context learning）在小模型上为零、过某个规模突然出现——争议与魅力并存。</div>
      </div>

      <h2 className="section-title">Chinchilla：修正与反思</h2>
      <pre className="code-block" data-lang="python">{CodeScaling}</pre>
      <p className="body-text">
        2022 年 DeepMind 的 Chinchilla 用同等算力训练了<strong>更多数据、更小参数</strong>的模型
        （70B / 1.4T token），全面击败 Gopher（280B / 0.3T）。结论：GPT-3 时代的模型都"参数过肥"。
        但讽刺的是——<strong>行业并没有转向 Chinchilla 最优</strong>：
        推理成本让"训小点、用久点"的大参数模型更划算（推理时算力 >> 训练时算力）。
      </p>

      <h2 className="section-title">Scaling 还能走多远？</h2>
      <div className="tag-grid">
        <div className="tag-card">
          <h4>数据墙</h4>
          <p>高质量公开文本接近耗尽（Villalobos et al. 估计 2026-2032 之间见底）。出路：合成数据、多模态数据、私有数据。</p>
        </div>
        <div className="tag-card">
          <h4>算力墙</h4>
          <p>单次前沿训练成本已达数亿美元。功耗、芯片供应、集群稳定性都成为瓶颈。</p>
        </div>
        <div className="tag-card">
          <h4>新斜率：推理时计算</h4>
          <p>o1/R1 开辟第二曲线：不再只靠训练规模，而是让模型"回答前多想几步"——测试时算力同样符合Scaling 规律。</p>
        </div>
      </div>

      <Quiz
        question="Chinchilla 的核心结论是什么？"
        options={['模型参数越大越好', '同等算力下，参数与数据应同比放大（约 20 token/参数）', '数据越多越好，参数无所谓', '训练轮数越多越好']}
        answer={1}
        explain="GPT-3 那代模型参数过肥、数据过瘦；70B+1.4T 优于 280B+0.3T。"
      />
    </div>
  )
}
