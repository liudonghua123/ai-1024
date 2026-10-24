import EmbeddingScatter from '../components/EmbeddingScatter.jsx'
import Flow from '../components/Flow.jsx'
import Quiz from '../components/Quiz.jsx'

const CodeEmbed = `# Embedding：把 token 变成向量
from sklearn.metrics.pairwise import cosine_similarity

# 一个训练好的 embedding 层（简化示意）
# 词表 5 万，每个词映射到 768 维向量
vec_king   = embed("国王")   # [0.21, -0.88, 0.34, ...]  768 个数
vec_queen  = embed("女王")
vec_banana = embed("香蕉")

cos(vec_king, vec_queen)   # → 0.78  很近！
cos(vec_king, vec_banana)  # → 0.03  毫无关系

# 经典向量运算（Word2Vec 时代的明星结论）：
# king - man + woman ≈ queen
# 语义变成了可计算的几何`

export default function Embedding() {
  return (
    <div className="fade-in">
      <h1 className="hero-title" style={{ fontSize: 'clamp(26px,4vw,40px)' }}>🗺️ Token 与 Embedding：AI 如何读懂文字</h1>
      <p className="body-text">
        计算机不认识"猫"这个字，只认识数字。所以大模型的第一步是：<strong>把文字切块（Tokenization），
        再把每块变成一串有意义的数字（Embedding）</strong>。这一步做不好，后面全白搭——
        它是整个大厦的地基下面那层钢筋混凝土。
      </p>

      <h2 className="section-title">两步走：切块 → 变向量</h2>
      <Flow
        label="从原始文本到向量序列"
        nodes={[
          { title: '原始文本', desc: '"我爱自然语言处理"' },
          { title: 'Tokenizer 分词', desc: '切成 token 子词单位', hot: true },
          { title: '查词表', desc: '每个 token → 整数 ID' },
          { title: 'Embedding 查表', desc: 'ID → 高维向量', hot: true },
          { title: '向量序列', desc: '送入 Transformer' },
        ]}
        arrows={[{ label: '输入' }, { label: 'BPE 切分' }, { label: '编码' }, { label: '可学习参数' }]}
      />
      <div className="tag-grid">
        <div className="tag-card">
          <h4>Token ≠ 词</h4>
          <p>"unbelievable" 可能被切成 un + believ + able 三块。英文平均 1 token ≈ 0.75 词，中文约 1 字 ≈ 0.6~1 token——这也是为什么不同语言计费不一样。</p>
        </div>
        <div className="tag-card">
          <h4>BPE 算法</h4>
          <p>高频词整体保留、低频词拆成子词，在词表大小和覆盖率之间取平衡。GPT 系列的 cl100k_base 词表约 10 万。</p>
        </div>
        <div className="tag-card">
          <h4>Embedding 是学出来的</h4>
          <p>一开始是随机向量，靠训练任务（预测下一个词等）不断调整，语义关系自然浮现：近义词向量靠近。</p>
        </div>
      </div>

      <h2 className="section-title">语义空间长什么样？</h2>
      <EmbeddingScatter />

      <h2 className="section-title">15 行感受向量运算</h2>
      <pre className="code-block" data-lang="python">{CodeEmbed}</pre>

      <div className="callout">
        <strong>为什么重要？</strong> Embedding 是"万物皆可向量化"的起点：文字、图片、语音、用户行为……
        都能变成向量后算相似度。推荐系统、语义搜索、RAG 的向量检索，底层全是它。
      </div>

      <Quiz
        question="为什么'国王'- '男人' + '女人' ≈ '女王' 能成立？"
        options={['词表排得好', '语义关系被编码成了向量空间中的方向', '模型背诵了这个等式', '巧合，换个模型就不成立不了']}
        answer={1}
        explain="训练让性别、时态、单复数等语义维度变成向量空间里稳定的方向，于是可以代数运算。"
      />
    </div>
  )
}
