import MoERouter from '../components/MoERouter.jsx'
import LoraMatmul from '../components/LoraMatmul.jsx'
import Flow from '../components/Flow.jsx'
import Quiz from '../components/Quiz.jsx'

const CodeZeRO = `# ZeRO：把训练状态切到 N 张卡上，显存降 8~64 倍
# 纯 DDP：每张卡存完整模型 + 梯度 + 优化器状态
#   fp16 参数 + fp16 梯度 + fp32 动量/方差 = 16N 字节/卡
#
# ZeRO-3（DeepSpeed）：
#   参数、梯度、优化器状态全部切片分片
#   每卡显存 ≈ 16N / N_gpu + 激活值

# 7B 模型在 8 张 A100 (80G) 上：
from deepspeed import initialize

model, optimizer, _, _ = initialize(
    model=model, optimizer=optimizer,
    config={ "zero_optimization": { "stage": 3,
              "offload_optimizer": True,   # 状态卸到 CPU
              "offload_param": True },     # 参数也卸
             "train_batch_size": 32 })
# 原本 OOM 的配置现在能跑，还能把 batch 开大`

export default function Efficient() {
  return (
    <div className="fade-in">
      <h1 className="hero-title" style={{ fontSize: 'clamp(26px,4vw,40px)' }}>⚙️ 高效训练与微调：算力的艺术</h1>
      <p className="body-text">
        大模型竞赛的隐藏战场不是算法，而是<strong>算力工程</strong>：
        同样的钱，谁能训出更大的模型、微调得更快？
        ZeRO、MoE、LoRA、知识蒸馏——四件套各管一段。
      </p>

      <h2 className="section-title">MoE：万亿参数的"部分激活"</h2>
      <MoERouter />

      <h2 className="section-title">LoRA：消费级显卡微调大模型</h2>
      <LoraMatmul />

      <h2 className="section-title">ZeRO 与显存账本</h2>
      <p className="body-text">
        训练显存大头不是参数，是<strong>优化器状态</strong>（fp32 的动量 + 方差，占 12N 字节/参数）。
        ZeRO 的思路：既然每张卡反正都要同步，不如把这些状态<strong>切片分片</strong>，用时再聚合——
        类似"别每人都带一整套工具，需要时去借"。
      </p>
      <Flow
        label="7B 模型微调的显存方案演进"
        nodes={[
          { title: '全参数 DDP', desc: '≈ 112GB/卡 · 8×A100' },
          { title: 'ZeRO-2', desc: '≈ 70GB · 优化器分片' },
          { title: 'ZeRO-3 + Offload', desc: '≈ 25GB · 状态卸 CPU', hot: true },
          { title: 'LoRA + QLoRA', desc: '≈ 10GB · 单卡 4090', hot: true },
        ]}
        arrows={[{ label: '基线' }, { label: '分片' }, { label: '卸载' }, { label: '低秩 + 4bit' }]}
      />

      <h2 className="section-title">知识蒸馏：大模型的钱，小模型来省</h2>
      <p className="body-text">
        Hinton 2015 的点子：让小模型不只学"正确答案"（one-hot），
        还学大模型输出的<strong>完整概率分布</strong>（"3.1 有 0.7 概率，3.7 有 0.2 概率……"）——
        这些"暗知识"包含类间相似性。LLM 时代的蒸馏更直接：拿大模型的输出当训练数据
        （如 Alpaca 蒸 GPT-4），或对齐 logits（如 DeepSeek-R1 蒸给 Qwen）。
        部署侧的成本直线下降。
      </p>

      <pre className="code-block" data-lang="python">{CodeZeRO}</pre>

      <div className="callout ok">
        <strong>一张表记住四件套</strong>：ZeRO 管"存得下"，MoE 管"算得省"，
        LoRA 管"调得动"，蒸馏管"跑得快"。前两者属于训练工程，后两者属于模型压缩——
        共同目标：把算力从瓶颈变成杠杆。
      </div>

      <Quiz
        question="LoRA 为什么能在消费级显卡上微调 70B 模型？"
        options={['它压缩了原模型权重', '冻结原权重，只训练低秩分解的两个小矩阵', '它降低了模型精度到 1bit', '它跳过了反向传播']}
        answer={1}
        explain="可训练参数降 99%+，优化器状态随之骤减；原模型还能 4bit 量化加载（QLoRA）进一步省。"
      />
    </div>
  )
}
