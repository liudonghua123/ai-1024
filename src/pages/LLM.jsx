import TokenStream from '../components/TokenStream.jsx'
import Flow from '../components/Flow.jsx'
import Quiz from '../components/Quiz.jsx'

const CodeNextToken = `# LLM 生成文本的本质：一个巨大的概率采样循环
def generate(model, prompt, max_tokens=100, temperature=0.8):
    tokens = tokenize(prompt)
    for _ in range(max_tokens):
        logits = model(tokens)              # 预测下一个 token 的分布
        probs = softmax(logits / temperature)  # 温度调节随机性
        next_tok = sample(probs)            # 采样一个 token
        if next_tok == EOS:                 # 模型觉得说完了
            break
        tokens.append(next_tok)             # 拼回去，继续接龙
    return detokenize(tokens)

# 你看到的"逐字输出"，背后就是这个循环在跑`

export default function LLM() {
  return (
    <div className="fade-in">
      <h1 className="hero-title" style={{ fontSize: 'clamp(26px,4vw,40px)' }}>💬 大语言模型：超大规模文字接龙</h1>
      <p className="body-text">
        把 GPT、Claude、Gemini、DeepSeek 这些名字扒掉包装，核心就是一件事：
        <strong>给定前面的文字，预测下一个 token</strong>。听起来平平无奇，
        但当「接龙」的规模到千亿参数、万亿 token 时，涌现出了推理、翻译、写代码等能力。
      </p>

      <h2 className="section-title">LLM 是怎么炼成的？三个阶段</h2>
      <Flow
        label="训练三部曲"
        nodes={[
          { title: '预训练', desc: '海量文本 · 学语言与世界知识', hot: true },
          { title: '监督微调 SFT', desc: '高质量问答示范 · 学会"说话"' },
          { title: '人类反馈强化学习 RLHF', desc: '人类打分 · 学会"好好说话"', hot: true },
          { title: '上线服务', desc: '推理 · 对话 · 写代码' },
        ]}
        arrows={[{ label: '万亿 token' }, { label: '几万条示范' }, { label: '偏好对齐' }]}
      />
      <p className="body-text">
        预训练像「读书破万卷」，模型学会了知识和语感，但只会接龙不会对话；
        SFT 用人写的示范教它「别人问、你答」；
        RLHF 再用人类偏好打磨，把「能回答」变成「回答得好」。
      </p>

      <h2 className="section-title">逐 Token 生成：现场看一次</h2>
      <TokenStream />

      <h2 className="section-title">推理时的关键参数</h2>
      <div className="table-scroll">
      <table className="compare">
        <thead>
          <tr><th>参数</th><th>作用</th><th>直觉</th></tr>
        </thead>
        <tbody>
          <tr><td>Temperature</td><td>控制采样随机性</td><td>0 = 死板认真，1+ = 天马行空。写代码调低，写诗调高。</td></tr>
          <tr><td>Top-p</td><td>只从累积概率前 p 的候选里采样</td><td>把长尾胡话直接截掉。</td></tr>
          <tr><td>Context Window</td><td>一次能"看见"的最大长度</td><td>上下文越长越贵也越能记事，但不是无限内存。</td></tr>
          <tr><td>System Prompt</td><td>给模型设定角色和规则</td><td>相当于入职时给它的岗位说明书。</td></tr>
        </tbody>
      </table>
      </div>

      <h2 className="section-title">20 行看懂生成循环</h2>
      <pre className="code-block" data-lang="python">{CodeNextToken}</pre>

      <h2 className="section-title">幻觉：LLM 的原罪</h2>
      <div className="callout warn">
        <strong>幻觉（Hallucination）</strong>：模型一本正经地编造事实。这不是 BUG，而是机制的必然——
        它优化目标是「接得像」，不是「说得对」。缓解手段：RAG（检索增强，先查资料再回答）、
        工具调用、引用溯源，但无法根除。
      </div>

      <h2 className="section-title">Scaling Law：越大越强的经验法则</h2>
      <p className="body-text">
        OpenAI 的研究发现：模型性能随<strong>参数量、数据量、算力</strong>三者按幂律平滑提升——
        只要按比例堆，损失函数就能预测性地下降。这一发现直接点燃了「大力出奇迹」的军备竞赛。
        但数据即将见顶、成本指数上升，行业正在转向「推理时多想几步」（如 o1/R1 的推理链）寻找新斜率。
      </p>

      <Quiz
        question="为什么 LLM 会产生'幻觉'？"
        options={['训练数据太少', '它的优化目标是预测下一个词，而非验证事实', '参数量不够大', '程序员写错了代码']}
        answer={1}
        explain="LLM 学的是语言分布，'编一个听起来合理的答案'和'说出真话'在接龙目标下是等价候选。"
      />
    </div>
  )
}
