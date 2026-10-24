import AttentionHeatmap from '../components/AttentionHeatmap.jsx'
import Flow from '../components/Flow.jsx'
import Quiz from '../components/Quiz.jsx'

const CodeSelfAttention = `# 自注意力的核心：Q 查询、K 键、V 值
import torch

def self_attention(X, Wq, Wk, Wv):
    Q, K, V = X @ Wq, X @ Wk, X @ Wv      # 三个线性投影
    scores = Q @ K.transpose(-2, -1) / (K.size(-1) ** 0.5)  # 相似度打分
    A = scores.softmax(dim=-1)            # 归一化成注意力权重
    return A @ V                          # 按权重加权汇总信息

# 多头注意力 = 多组上面这玩意儿并行，各看各的角度
# nn.MultiheadAttention(embed_dim=512, num_heads=8)`

export default function Transformer() {
  return (
    <div className="fade-in">
      <h1 className="hero-title" style={{ fontSize: 'clamp(26px,4vw,40px)' }}>🧲 Transformer：一切的地基</h1>
      <p className="body-text">
        2017 年 Google 那篇著名的论文标题就是宣言：<strong>《Attention Is All You Need》</strong>——
        不需要 RNN 的循环、不需要 CNN 的卷积，只用「注意力」就够了。此后 NLP、CV、语音、多模态……
        几乎所有大模型的地基都是它。
      </p>

      <h2 className="section-title">它解决了什么问题？</h2>
      <p className="body-text">
        在它之前，处理序列（比如一句话）的主力是 RNN/LSTM：一个词一个词地读，像磁带一样顺序前进。
        这带来两个致命问题：
      </p>
      <div className="tag-grid">
        <div className="tag-card">
          <h4>① 无法并行</h4>
          <p>必须读完第 N 个词才能读第 N+1 个，GPU 这种「千军万马」的算力根本喂不饱。</p>
        </div>
        <div className="tag-card">
          <h4>② 长距离遗忘</h4>
          <p>读到句子结尾，开头的信息经过几十次传递早已衰减——「我昨天见过那个朋友的朋友的……」记不住。</p>
        </div>
      </div>
      <div className="callout ok">
        Transformer 的答案：<strong>自注意力让任意两个词直接相连</strong>，距离为 0；且整个序列可以同时计算，GPU 拉满。
        一次解决两个问题。
      </div>

      <h2 className="section-title">注意力是怎么算的？</h2>
      <p className="body-text">
        每个词会生成三个向量：<strong>Query（我想找什么）</strong>、<strong>Key（我有什么特征）</strong>、
        <strong>Value（我实际携带的信息）</strong>。用 Q 和所有 K 算相似度 → softmax 归一化成权重 →
        按权重加权求和所有 V。每个词的新表示 = 它「按需」从全句各词收集来的信息。
      </p>
      <AttentionHeatmap />

      <h2 className="section-title">整体流程图</h2>
      <Flow
        label="Transformer Encoder Block 数据流"
        nodes={[
          { title: '输入嵌入', desc: '词 → 向量 + 位置编码' },
          { title: '多头自注意力', desc: '8 个头各看各的角度', hot: true },
          { title: 'Add & Norm', desc: '残差连接 + 层归一化' },
          { title: '前馈网络 FFN', desc: '两层 MLP，逐位置加工' },
          { title: '再 Add & Norm', desc: '堆 N 层，输出表示' },
        ]}
        arrows={[{ label: 'token 序列' }, { label: '信息交换' }, { label: '稳定训练' }, { label: '非线性加工' }]}
      />
      <Flow
        label="Encoder-Decoder（机器翻译视角）"
        nodes={[
          { title: '源句子', desc: '"我爱猫"' },
          { title: 'Encoder', desc: '编码成语义表示' },
          { title: 'Cross-Attention', desc: '解码器回头看源句', hot: true },
          { title: 'Decoder', desc: '自回归生成' },
          { title: '目标句子', desc: '"I love cats"' },
        ]}
        arrows={[{ label: '输入' }, { label: '语义压缩' }, { label: '对齐' }, { label: '逐词输出' }]}
      />

      <h2 className="section-title">30 行看懂核心代码</h2>
      <pre className="code-block" data-lang="python">{CodeSelfAttention}</pre>

      <h2 className="section-title">关键概念速查</h2>
      <div className="table-scroll">
      <table className="compare">
        <thead>
          <tr><th>概念</th><th>一句话解释</th></tr>
        </thead>
        <tbody>
          <tr><td>位置编码</td><td>注意力本身"不分先后"，需要给每个词加上位置信息，否则「猫追狗」和「狗追猫」没区别。</td></tr>
          <tr><td>多头注意力</td><td>把注意力拆成多组并行，有的头看语法、有的头看指代，各司其职再拼接。</td></tr>
          <tr><td>残差连接</td><td>输出 = 输入 + 加工结果，让梯度有"高速公路"，几十上百层也能训得动。</td></tr>
          <tr><td>Layer Norm</td><td>把每层数值拉回稳定区间，防止越训越飘。</td></tr>
        </tbody>
      </table>
      </div>

      <Quiz
        question="为什么 Transformer 比 RNN 更适合 GPU 大规模训练？"
        options={['因为参数量更小', '因为序列可以整体并行计算', '因为它不需要数据', '因为它用了更多激活函数']}
        answer={1}
        explain="自注意力对所有位置同时计算，没有 RNN 的顺序依赖，GPU 的并行能力能被完全利用。"
      />
    </div>
  )
}
