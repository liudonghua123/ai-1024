// 改变 AI 的 36 篇经典论文 · 数据源
// cat: infra 基础设施 | nlp 语言模型 | vision 视觉生成 | data 数据 | agent 推理与智能体
export const CATS = {
  infra: { name: '基础设施', color: '#38e1ff', icon: '⚙️' },
  nlp: { name: '语言模型', color: '#a78bfa', icon: '💬' },
  vision: { name: '视觉生成', color: '#3ddc84', icon: '🎨' },
  data: { name: '数据工程', color: '#ffb347', icon: '🗄️' },
  agent: { name: '推理与智能体', color: '#ff5c8a', icon: '🤖' },
}

export const PAPERS = [
  // ---- 基础设施 ----
  { name: 'Brook', year: 2004, cat: 'infra', glyph: '♨', desc: 'GPU 流式编程语言，NVIDIA CUDA 的精神前身——GPU 通用计算的起点。' },
  { name: 'ResNet', year: 2015, cat: 'infra', glyph: '⇌', desc: '残差连接：让上百层网络可训练，深层网络时代的奠基之作。' },
  { name: 'ZeRO', year: 2019, cat: 'infra', glyph: '⊞', desc: '零冗余优化器：把模型状态切分到多卡，超大模型训练的显存解药。' },
  { name: 'MegaScale', year: 2024, cat: 'infra', glyph: '▦', desc: '字节跳动万卡集群训练系统：万卡并行的工程实践与稳定性设计。' },
  { name: 'Distillation', year: 2015, cat: 'infra', glyph: '蒸馏', desc: 'Hinton 知识蒸馏：让小模型学大模型的"暗知识"，部署省算力的标配。' },
  { name: 'MoE', year: 2017, cat: 'infra', glyph: 'ancements', desc: '稀疏混合专家：每次只激活部分参数，"大力"与"省钱"兼得（Mixtral/DeepSeek 的心脏）。' },
  { name: 'LoRA', year: 2021, cat: 'infra', glyph: '⟳', desc: '低秩适配微调：冻结原模型只训两个小矩阵，消费级显卡也能微调大模型。' },

  // ---- 语言模型 ----
  { name: 'Word2Vec', year: 2013, cat: 'nlp', glyph: '↔', desc: '词向量化鼻祖：king - man + woman ≈ queen，语义第一次可以计算。', link: '#/embedding' },
  { name: 'Seq2Seq', year: 2014, cat: 'nlp', glyph: '⇥', desc: '编码器-解码器框架：机器翻译的神经化开端。' },
  { name: 'Attention', year: 2014, cat: 'nlp', glyph: '✦', desc: 'Bahdanau 注意力：让翻译模型学会"回头看"源句子。', link: '#/transformer' },
  { name: 'GNMT', year: 2016, cat: 'nlp', glyph: '文A', desc: '谷歌神经机器翻译：8 层 LSTM 上线生产，宣告统计翻译时代终结。' },
  { name: 'Transformer', year: 2017, cat: 'nlp', glyph: '⟐', desc: 'Attention Is All You Need：整个大模型时代的技术地基。', link: '#/transformer', hot: true },
  { name: 'GPT-1', year: 2018, cat: 'nlp', glyph: 'I', desc: '生成式预训练：先读万卷书再微调的范式确立。', link: '#/llm' },
  { name: 'BERT', year: 2018, cat: 'nlp', glyph: '⌐▌', desc: '双向编码预训练：刷新 11 项 NLP 纪录，引爆预训练军备赛。' },
  { name: 'GPT-2', year: 2019, cat: 'nlp', glyph: 'Ⅱ', desc: '15 亿参数 + zero-shot："语言模型是无监督多任务学习器"。' },
  { name: 'GPT-3', year: 2020, cat: 'nlp', glyph: 'Ⅲ', desc: '1750 亿参数的 in-context learning：few-shot 时代的开启。', link: '#/llm', hot: true },
  { name: 'Bitter Lesson', year: 2019, cat: 'nlp', glyph: '√', desc: 'Rich Sutton 苦涩教训：靠算力的通用方法终将战胜人工巧思。' },
  { name: 'Scaling Laws', year: 2020, cat: 'nlp', glyph: '📈', desc: 'OpenAI 幂律缩放：性能可预测，"大力出奇迹"有了理论依据。', link: '#/llm' },
  { name: 'Chinchilla', year: 2022, cat: 'nlp', glyph: '⚖', desc: 'DeepMind：同算力下数据比参数更该堆，训练配比的黄金法则。' },
  { name: 'InstructGPT', year: 2022, cat: 'nlp', glyph: '→人', desc: 'RLHF 登场：ChatGPT 的直接前身，对齐人类指令的开端。', link: '#/rlhf', hot: true },
  { name: 'Tülü 3', year: 2024, cat: 'nlp', glyph: '𝕋', desc: 'AI2 全开源模型：数据、代码、配方全公开，DPO 对齐的完整范本。' },

  // ---- 视觉生成 ----
  { name: 'AlexNet', year: 2012, cat: 'vision', glyph: '▦', desc: '深度学习引爆点：GPU 训练 CNN 横扫 ImageNet，计算机视觉改朝换代。' },
  { name: 'Video CNN', year: 2014, cat: 'vision', glyph: '▶', desc: '视频理解：把 CNN 从图像扩展到时序帧。' },
  { name: 'Two-Stream', year: 2014, cat: 'vision', glyph: '⇉', desc: '双流网络：空间 + 光流两路并行，视频动作识别经典架构。' },
  { name: 'GAN', year: 2014, cat: 'vision', glyph: '⚔', desc: '生成对抗网络：生成器与判别器博弈，AI 造图的先声。' },
  { name: 'Diffusion', year: 2015, cat: 'vision', glyph: '🌀', desc: '扩散概率模型：加噪再去噪的思想首次提出，等待十年后爆发。' },
  { name: 'DDPM', year: 2020, cat: 'vision', glyph: '◌', desc: '去噪扩散概率模型：把扩散做成可用的图像生成器，SD 的直系祖先。' },
  { name: 'ViT', year: 2020, cat: 'vision', glyph: '⊞', desc: 'Vision Transformer：图像切块当 token，纯注意力做视觉。' },
  { name: 'CLIP', year: 2021, cat: 'vision', glyph: '∞', desc: '4 亿图文对对比学习：图文说同一种语言，文生图的理解底座。', link: '#/multimodal', hot: true },
  { name: 'Latent Diffusion', year: 2021, cat: 'vision', glyph: '▢', desc: 'Stable Diffusion 的论文：潜空间扩散，消费级显卡跑文生图。', link: '#/stable-diffusion', hot: true },
  { name: 'DiT', year: 2022, cat: 'vision', glyph: '⟁', desc: 'Diffusion Transformer：Sora 的骨架，扩散主干的 Transformer 化。', link: '#/dit', hot: true },

  // ---- 数据工程 ----
  { name: 'LAION-5B', year: 2022, cat: 'data', glyph: '⬚', desc: '58.5 亿图文对开源数据集：Stable Diffusion 的训练粮仓。' },
  { name: 'RefinedWeb', year: 2023, cat: 'data', glyph: '⧗', desc: 'Falcon 团队：5 万亿 token 高质量网页数据，证明数据清洗胜过堆量。' },

  // ---- 推理与智能体 ----
  { name: 'AlphaGo Zero', year: 2017, cat: 'agent', glyph: '⚫', desc: '零人类棋谱自我博弈：超越人类千年棋力，强化学习的封神之战。' },
  { name: 'CoT', year: 2022, cat: 'agent', glyph: '⛓', desc: '思维链："让我们一步步思考"，few-shot 推理能力的开关。' },
  { name: 'ReAct', year: 2022, cat: 'agent', glyph: '⟲', desc: '推理 + 行动交替：LLM Agent 的标准工作循环。', link: '#/agent', hot: true },
]

export const PAPER_LINKS = PAPERS.filter(p => p.link).length
