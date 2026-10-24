import RlhfDemo from '../components/RlhfDemo.jsx'
import Flow from '../components/Flow.jsx'
import Quiz from '../components/Quiz.jsx'

const CodeDPO = `# RLHF 经典三件套之外，后起之秀 DPO 更简洁
# PPO 版（InstructGPT/ChatGPT）：
#   1. 训练奖励模型 reward_model(prompt, response) -> 分数
#   2. 用 PPO 算法优化策略，同时 KL 约束别跑太远
loss_ppo = -E[min(r * ratio, clip(ratio, 1-ε, 1+ε) * r)] + β*KL(π‖π_ref)

# DPO 版（2023，免去奖励模型和强化学习循环）：
# 直接从"偏好对"(chosen, rejected) 学习
loss_dpo = -E[log σ(β * (log π(chosen)/π_ref(chosen)
                       - log π(rejected)/π_ref(rejected)))]
# 一句直觉：拉高好回答的概率，压低差回答的概率，
# 并且相对参考模型别偏太远（防退化成话痨或杠精）`

export default function RLHF() {
  return (
    <div className="fade-in">
      <h1 className="hero-title" style={{ fontSize: 'clamp(26px,4vw,40px)' }}>🎯 RLHF：让模型学会"好好说话"</h1>
      <p className="body-text">
        预训练出来的模型只会接龙，你问"怎么写简历"，它可能回你三篇范文开头就停了。
        让它变得有用、诚实、无害的关键一步，是<strong>人类反馈强化学习</strong>——
        ChatGPT 之所以像"聊天"而不像"文档续写"，全靠这一环。
      </p>

      <h2 className="section-title">三阶段流水线</h2>
      <Flow
        label="从裸模型到 AI 助手"
        nodes={[
          { title: '预训练模型', desc: '知识丰富但不会对话' },
          { title: 'SFT 监督微调', desc: '人类示范"怎么答"', hot: true },
          { title: '训练奖励模型', desc: '人类排序 → 学会打分', hot: true },
          { title: 'PPO 强化学习', desc: '按奖励分优化策略' },
          { title: '对齐后的助手', desc: '有用 · 诚实 · 无害' },
        ]}
        arrows={[{ label: '基座' }, { label: '几万条示范' }, { label: '偏好数据' }, { label: 'KL 约束' }]}
      />

      <h2 className="section-title">亲手体验一次标注</h2>
      <RlhfDemo />

      <h2 className="section-title">为什么需要 KL 约束？</h2>
      <p className="body-text">
        强化学习目标只有"拿高分"，模型会钻空子：<strong>奖励黑客（Reward Hacking）</strong>——
        比如学会写超长废话（有的标注员偏爱长答案）、堆满免责声明、或者谄媚地说用户爱听的。
        KL 散度约束让模型不许离参考模型（SFT 版）太远，保住语言能力的下限。
        这跟员工只顾 KPI 不顾业务是一个道理——绩效指标要设计好。
      </p>

      <h2 className="section-title">DPO：后起之秀</h2>
      <pre className="code-block" data-lang="python">{CodeDPO}</pre>
      <p className="body-text">
        PPO 流程复杂、训练不稳、显存翻倍。2023 年的 <strong>DPO（直接偏好优化）</strong>证明：
        可以绕过奖励模型和强化学习循环，直接从偏好对数据优化策略，效果相当、稳定性更好——
        如今很多开源对齐模型（如 Zephyr）都用它。
      </p>

      <div className="callout warn">
        <strong>对齐税（Alignment Tax）</strong>：RLHF 让模型更有礼貌，但也可能让它变怂——
        拒答变多、创意下降、过于四平八稳。对齐强度是个滑块，不是开关。
      </div>

      <Quiz
        question="奖励模型（RM）的作用是什么？"
        options={['生成最终回答', '模拟人类偏好，给回答打分以指导强化学习', '压缩模型体积', '检索外部知识']}
        answer={1}
        explain="RM 把'人类排序数据'蒸馏成一个可自动调用的打分器，让 RL 循环不必每次都请真人。"
      />
    </div>
  )
}
