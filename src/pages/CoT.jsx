import ChainOfThought from '../components/ChainOfThought.jsx'
import PageTitle from '../components/PageTitle.jsx'
import Flow from '../components/Flow.jsx'
import Quiz from '../components/Quiz.jsx'

const CodeCoT = `# CoT 两种用法：提示词版（2022 原论文）与 RL 版（2024-25）
# 1. Zero-shot CoT：一句话魔法
prompt = f"{question}\\n让我们一步一步思考。"
#   → GSM8K 数学题正确率显著提升，无需任何示例

# 2. Few-shot CoT：给几个带推理步骤的示例
prompt = """Q: 罗杰有 5 个网球，又买 2 罐每罐 3 个，共几个？
A: 先算买来的 2×3=6，再加原有 5，5+6=11。答案 11。
Q: 食堂有 23 个苹果，用了 20 个做午餐又买 6 个，共几个？
A: 23-20=3，3+6=9。答案 9。
Q: {新问题}
A:"""

# 3. RL 时代（o1/R1）：不再靠提示词，
#    用可验证奖励（答案对错）直接强化"思考过程"
# reward = verify(answer)   # 只看最终结果对不对
# 模型自发学会：自我验证、回溯、尝试多种路径`

export default function CoT() {
  return (
    <div className="fade-in">
      <PageTitle icon='cot'>思维链与推理：让模型"想清楚再答"</PageTitle>
      <p className="body-text">
        2022 年 Google 的论文标题就是咒语本身：<strong>Chain-of-Thought Prompting</strong>。
        只需在提示词里加一句"让我们一步一步思考"，同样的模型数学题正确率翻三倍。
        三年后，o1/R1 把这个技巧升级成训练范式——<strong>推理模型时代开启</strong>。
      </p>

      <h2 className="section-title">对比实验：跳步 vs 一步步</h2>
      <ChainOfThought />

      <h2 className="section-title">CoT 为什么有效？</h2>
      <Flow
        label="计算的本质：把深度换成步数"
        nodes={[
          { title: '单次前向', desc: 'Transformer 每层计算量固定' },
          { title: '难题需要更多计算', desc: '一步算不出来' },
          { title: 'CoT = 外接草稿纸', desc: '把中间结果写进上下文', hot: true },
          { title: '每步只做简单预测', desc: 'N 个简单步骤 > 1 个复杂跳步' },
          { title: '正确率大幅提升', desc: 'GSM8K 3 倍+', hot: true },
        ]}
        arrows={[{ label: '固定算力' }, { label: '瓶颈' }, { label: '生成 token' }, { label: '分而治之' }]}
      />
      <p className="body-text">
        深刻之处：Transformer 单次前向的计算量是固定的，但<strong>生成 N 个 token = 计算 N 次</strong>。
        思维链本质是给模型外接了可伸缩的"草稿纸"——问题越难，思考越久，算力随需分配。
      </p>

      <h2 className="section-title">从提示词技巧到训练范式</h2>
      <div className="steps">
        <div className="step-item"><strong>2022 · Few-shot CoT</strong>：提示词里给推理示例，上下文学习触发。</div>
        <div className="step-item"><strong>2022 · Zero-shot CoT</strong>："Let's think step by step" 一句咒语就生效——能力本来就在，只是没被唤醒。</div>
        <div className="step-item"><strong>2023 · Self-Consistency</strong>：采样多条思维链投票取多数，再涨一截。</div>
        <div className="step-item"><strong>2024 · o1 / RLVR</strong>：用可验证奖励（答案对错）做强化学习，模型<strong>自发</strong>学会长思考、回溯、验证——"测试时计算"成为新 Scaling 维度。</div>
        <div className="step-item"><strong>2025 · R1 开源复现</strong>：证明 RLVR 不需要人工标注的推理过程，纯结果信号就能炼出推理能力。</div>
      </div>

      <pre className="code-block" data-lang="python">{CodeCoT}</pre>

      <div className="callout warn">
        <strong>代价与新问题</strong>：推理模型回答慢、token 消耗高；"过度思考"简单问题浪费算力；
        思维链可解释性存疑（显示的推理不一定是"真实"的计算过程——faithfulness 问题）。
      </div>

      <Quiz
        question="CoT 本质上用什么东西换取了准确率？"
        options={['更大的模型参数量', '更多的推理时计算（生成更多 token 逐步求解）', '更多的训练数据', '更高的学习率']}
        answer={1}
        explain="生成 N 个 token 就是 N 次前向计算——把固定算力的问题变成可伸缩算力的问题。"
      />
    </div>
  )
}
