import AgentLoopDemo from '../components/AgentLoopDemo.jsx'
import PageTitle from '../components/PageTitle.jsx'
import Flow from '../components/Flow.jsx'
import Quiz from '../components/Quiz.jsx'

const CodeAgent = `# Agent 主循环：一个 while 循环撑起整个智能体
TOOLS = {"search": search_web, "weather": get_weather,
         "python": run_python, "write": write_file}

def agent(task, max_steps=10):
    messages = [system(PROMPT), user(task)]
    for _ in range(max_steps):
        resp = llm(messages, tools=TOOLS)     # LLM 决定下一步

        if resp.tool_calls:                   # 要用工具
            for call in resp.tool_calls:
                result = TOOLS[call.name](**call.args)  # 执行
                messages.append(tool_result(result))    # 观察结果喂回去
        else:                                 # 不要工具 = 认为任务完成
            return resp.content
    return "步数用完，任务未完成"  # 保险丝：防止无限循环

# 关键设计：Function Calling（让 LLM 输出结构化工具调用）
# + 记忆（短期=上下文窗口，长期=向量库）
# + 规划（任务拆解 / ReAct / Reflection 自我反思）`

export default function Agent() {
  return (
    <div className="fade-in">
      <PageTitle icon='agent'>AI Agent：给大脑装上手脚</PageTitle>
      <p className="body-text">
        LLM 只能"说"，不能"做"——问它今天天气，它只能编一个。
        <strong>Agent（智能体）</strong>= LLM 大脑 + 工具调用 + 记忆 + 循环调度：
        让模型自己决定"下一步干什么"，调搜索引擎、跑代码、读写文件、查 API，
        在多轮循环里逼近目标。<strong>2025 年之后 AI 应用的主战场。</strong>
      </p>

      <h2 className="section-title">Agent 的四大件</h2>
      <Flow
        label="Agent 架构拆解"
        nodes={[
          { title: '大脑 LLM', desc: '理解 · 推理 · 决策', hot: true },
          { title: '工具集', desc: '搜索 / 代码 / API / 文件' },
          { title: '记忆', desc: '短期上下文 + 长期向量库' },
          { title: '调度循环', desc: 'ReAct / 规划 / 反思', hot: true },
        ]}
        arrows={[{ label: '选择工具' }, { label: '存取经验' }, { label: '约束行为' }]}
      />

      <h2 className="section-title">现场跑一个任务</h2>
      <AgentLoopDemo />

      <h2 className="section-title">关键机制逐个看</h2>
      <div className="steps">
        <div className="step-item"><strong>Function Calling</strong>：不是让模型输出文字描述"我想搜索"，而是输出结构化 JSON（函数名 + 参数），由运行时真正执行。这是 Agent 可靠性的基石。</div>
        <div className="step-item"><strong>ReAct 模式</strong>：思考（Reason）和行动（Act）交替进行，每步行动后观察结果再决定下一步。比一次性规划更能应对意外。</div>
        <div className="step-item"><strong>记忆分层</strong>：短期记忆就是上下文窗口（有限且贵）；长期记忆存向量数据库，需要时检索回来——本质上是给 Agent 配了个 RAG。</div>
        <div className="step-item"><strong>反思与规划</strong>：Reflection 让模型检查自己的产出再改进；复杂任务先拆子任务（Plan-and-Execute），再逐个执行。</div>
        <div className="step-item"><strong>保险丝</strong>：最大步数、超时、人工确认敏感操作。自主循环没有刹车就是事故现场。</div>
      </div>

      <h2 className="section-title">核心代码骨架</h2>
      <pre className="code-block" data-lang="python">{CodeAgent}</pre>

      <div className="callout warn">
        <strong>现实的骨感</strong>：Demo 里 Agent 行云流水，生产环境里它可能死循环、调错工具、
        被一个 404 卡住十轮。可靠性工程（错误恢复、结果校验、权限管控）比模型本身更花功夫。
        所谓"Agent 年"，是基础能力与工程打磨共同熬出来的。
      </div>

      <Quiz
        question="Agent 与普通 LLM 对话应用的本质区别是什么？"
        options={['Agent 的模型参数更大', 'Agent 能自主决策调用工具并在循环中迭代完成任务', 'Agent 不需要提示词', 'Agent 不会产生幻觉']}
        answer={1}
        explain="核心是'自主性'：从被动一问一答，变成主动规划-执行-观察-修正的闭环。"
      />
    </div>
  )
}
