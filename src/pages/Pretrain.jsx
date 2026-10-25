import MaskFill from '../components/MaskFill.jsx'
import PageTitle from '../components/PageTitle.jsx'
import Flow from '../components/Flow.jsx'
import Quiz from '../components/Quiz.jsx'

const CodePretrain = `# 预训练目标：一句话看懂两大流派
import torch.nn.functional as F

# GPT 式：自回归（CLM）—— 只看左边，预测下一个
logits = model(tokens[:, :-1])          # 输入: [t1..t_{n-1}]
loss = F.cross_entropy(
    logits.transpose(1, 2),
    tokens[:, 1:],                       # 标签: [t2..t_n]（右移一位）
)   # 每个位置都在做"预测下一词"

# BERT 式：掩码语言模型（MLM）—— 遮 15% 随机词，看前后文猜
masked, labels = random_mask(tokens, prob=0.15)  # 遮住一些词
logits = model(masked)
loss = F.cross_entropy(logits[labels != -100], labels[labels != -100])

# 区别一句话：BERT 学"理解"，GPT 学"生成"。
# 生成范式与使用方式一致 → 最终是对话模型赢了。`

export default function Pretrain() {
  return (
    <div className="fade-in">
      <PageTitle icon='pretrain'>预训练范式：先读万卷书</PageTitle>
      <p className="body-text">
        2018 年，AI 研究的关键词从"设计架构"变成了"预训练 + 微调"：
        先在海量无标注文本上自学语言，再针对具体任务微调。
        这一年 BERT 与 GPT 同场竞技，也埋下了两条路线的根本分歧——
        <strong>理解 vs 生成</strong>。最终 GPT 路线通向了 ChatGPT。
      </p>

      <h2 className="section-title">BERT vs GPT：两种完形填空</h2>
      <MaskFill />

      <h2 className="section-title">同一分岔，两种命运</h2>
      <Flow
        label="两条预训练路线"
        nodes={[
          { title: '2018 · 分岔点', desc: 'Transformer 就绪' },
          { title: 'BERT 双向 MLM', desc: '理解强 · 生成弱' },
          { title: '统治 NLP 四年', desc: '各类榜单屠榜' },
          { title: 'GPT 单向 CLM', desc: '与生成方式一致' },
          { title: 'GPT-3 涌现 in-context', desc: '规模放大后质变', hot: true },
          { title: 'ChatGPT', desc: '对话革命', hot: true },
        ]}
        arrows={[{ label: '' }, { label: 'Mask 15%' }, { label: '' }, { label: '逐词预测' }, { label: '' }]}
      />
      <p className="body-text">
        BERT 不是失败者——它的双向理解至今活在搜索引擎和各类判别任务里。
        但<strong>生成式范式有一个决定性优势</strong>：训练目标（预测下一词）
        和使用方式（生成文本）完全一致，规模放大时收益不间断地涌现。
        BERT 的完形填空在规模变大后没有同等级别的涌现现象。
      </p>

      <h2 className="section-title">苦涩教训（Bitter Lesson）</h2>
      <div className="callout warn">
        Rich Sutton 2019 年的著名反思：70 年 AI 史反复证明，
        <strong>依赖算力的通用方法终将击败依赖人类知识的精巧设计</strong>。
        深度学习 > 特征工程，Scaling > 架构创新，GPT > BERT——同一逻辑的三次胜利。
        短期看，研究者总觉得"人类先验"很聪明；长期看，暴力搜索和学习的扩展性无敌。
      </div>

      <h2 className="section-title">预训练代码：核心就几行</h2>
      <pre className="code-block" data-lang="python">{CodePretrain}</pre>

      <Quiz
        question="为什么最终是 GPT 的生成式范式胜出？"
        options={['BERT 训练成本更高', '生成式训练目标与使用方式一致，规模放大时能力持续涌现', 'BERT 的双向注意力有 bug', '谷歌不再维护 BERT']}
        answer={1}
        explain="CLM 与生成任务天然对齐，in-context learning 等能力随规模涌现；MLM 的增益在大规模下趋于饱和。"
      />
    </div>
  )
}
