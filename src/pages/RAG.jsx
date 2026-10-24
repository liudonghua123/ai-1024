import RagPipelineDemo from '../components/RagPipelineDemo.jsx'
import Flow from '../components/Flow.jsx'
import Quiz from '../components/Quiz.jsx'

const CodeRag = `# RAG 三步：索引 → 检索 → 生成
# 1. 索引：文档切块、向量化、入库
chunks = split_documents(docs, chunk_size=512)
vectors = embedding_model.encode(chunks)
db = VectorDB(); db.insert(vectors, chunks)   # FAISS / Milvus...

# 2. 检索：问题也变成向量，找最近邻
q_vec = embedding_model.encode(user_question)
top_k = db.search(q_vec, k=3)                 # 余弦相似度 Top-3

# 3. 生成：把检索结果塞进 Prompt，让 LLM 照着答
prompt = f"仅根据以下资料回答，不得编造：
资料：{top_k}
问题：{user_question}"
answer = llm.generate(prompt)`

export default function RAG() {
  return (
    <div className="fade-in">
      <h1 className="hero-title" style={{ fontSize: 'clamp(26px,4vw,40px)' }}>📚 RAG：先查资料再开口</h1>
      <p className="body-text">
        LLM 知识停留在训练截止日、不知道你的私有数据、还爱一本正经地编——
        <strong>检索增强生成（RAG）</strong>就是这三连击的解药：回答之前先去知识库里检索相关资料，
        把资料和问题一起塞给 LLM，让它"开卷考试"。
      </p>

      <h2 className="section-title">全流程一图看懂</h2>
      <Flow
        label="RAG 离线建库 + 在线问答"
        nodes={[
          { title: '文档切块', desc: 'Chunking 512 token 左右' },
          { title: '向量化入库', desc: 'Embedding + 向量数据库', hot: true },
          { title: '用户提问', desc: '问题同样向量化' },
          { title: '相似度检索', desc: '取 Top-K 相关片段', hot: true },
          { title: 'Prompt 拼装', desc: '资料 + 问题 + 指令' },
          { title: 'LLM 生成', desc: '有据可查的回答' },
        ]}
        arrows={[{ label: '离线' }, { label: '建库' }, { label: '在线' }, { label: 'ANN 搜索' }, { label: '开卷' }]}
      />

      <h2 className="section-title">现场试一次</h2>
      <RagPipelineDemo />

      <h2 className="section-title">为什么不用微调解决？</h2>
      <div className="table-scroll">
        <table className="compare">
          <thead>
            <tr><th>维度</th><th>RAG</th><th>微调 Fine-tuning</th></tr>
          </thead>
          <tbody>
            <tr><td>知识更新</td><td>改文档即时生效</td><td>重新训练</td></tr>
            <tr><td>成本</td><td>低（建库即可）</td><td>高（GPU + 数据）</td></tr>
            <tr><td>可溯源</td><td>能给出引用出处</td><td>知识熔进权重，说不清来源</td></tr>
            <tr><td>擅长的</td><td>事实型、时效型知识</td><td>风格、格式、领域行为</td></tr>
            <tr><td>幻觉抑制</td><td>强（有原文对照）</td><td>有限</td></tr>
          </tbody>
        </table>
      </div>
      <div className="callout ok">
        实践中二者互补：<strong>RAG 管知识新鲜度，微调管说话风格</strong>。企业知识库问答几乎是 RAG 的教科书场景。
      </div>

      <h2 className="section-title">核心代码骨架</h2>
      <pre className="code-block" data-lang="python">{CodeRag}</pre>

      <div className="callout warn">
        <strong>RAG 的坑</strong>：切块切得烂 → 检索不到；问题歧义 → 召回错；检索对了 LLM 不看资料自己编 →
        前功尽弃。所以工程上有一堆补救：混合检索（向量 + 关键词）、重排序（Rerank）、查询改写……
        一个生产级 RAG，60% 的工作量在检索质量上。
      </div>

      <Quiz
        question="RAG 相比直接问 LLM，最大的优势是什么？"
        options={['回答速度更快', '知识可实时更新且可溯源，显著减少幻觉', '模型参数变多了', '不需要 GPU']}
        answer={1}
        explain="RAG 把'闭卷背书'变成'开卷考试'，答案有据可查，知识库更新即生效。"
      />
    </div>
  )
}
