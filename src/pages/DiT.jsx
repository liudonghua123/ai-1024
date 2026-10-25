import Flow from '../components/Flow.jsx'
import PageTitle from '../components/PageTitle.jsx'
import Quiz from '../components/Quiz.jsx'

const CodeDiT = `# DiT 核心思路：把扩散模型的主干从 UNet 换成 Transformer
# 图像切成 patch（类似 ViT），每个 patch 是一个 "视觉 token"

class DiTBlock(nn.Module):
    """DiT 的块：用 adaptive LayerNorm 让时间步 t 和条件 y
       来调制(调节)每一层的归一化参数 —— 这是关键设计"""
    def forward(self, x, c):
        shift_msa, scale_msa, gate_msa, \\
        shift_mlp, scale_mlp, gate_mlp = self.adaLN(c).chunk(6)
        x = x + gate_msa * self.attn(modulate(x, shift_msa, scale_msa))
        x = x + gate_mlp * self.mlp(modulate(x, shift_mlp, scale_mlp))
        return x
    # x: [B, N, D]  N = (H/patch) * (W/patch) 个视觉 token
    # c: 时间步 embedding + 类别/文本条件

# 效果：可扩展性(scaling)曲线漂亮，FID 随模型变大持续下降
# Sora 视频生成正是把图像 patch 换成了 时空 patch (spacetime patches)`

export default function DiT() {
  return (
    <div className="fade-in">
      <PageTitle icon='dit'>DiT：扩散模型换上 Transformer 心脏</PageTitle>
      <p className="body-text">
        2022 年底，William Peebles & Saining Xie（后来 Sora 团队的核心）干了件「排列组合」的事：
        <strong>扩散模型 + Transformer = Diffusion Transformer（DiT）</strong>。
        把 Stable Diffusion 里做去噪的卷积 UNet 换成 Transformer，结果发现：
        规模越大性能越好，扩展曲线堪称完美。Sora、Stable Diffusion 3、Flux 背后都是它。
      </p>

      <h2 className="section-title">动机：UNet 卷积的"天花板"</h2>
      <div className="tag-grid">
        <div className="tag-card">
          <h4>UNet 的优势</h4>
          <p>卷积天然吃局部结构，配合跳连对图像很友好；但它<strong>不是全局的</strong>——感受野有限，远处的元素要层层传递才能互动。</p>
        </div>
        <div className="tag-card">
          <h4>Transformer 的诱惑</h4>
          <p>NLP 里已被验证的真理：<strong>scaling 完胜架构细节</strong>。把视觉 token 化，就能直接套用 LLM 那套「堆大模型」的方法论。</p>
        </div>
      </div>
      <div className="callout ok">
        DiT 论文的核心结论：随着 Transformer 变深变宽、patch 变小，生成质量（FID）持续显著提升——
        <strong>「在扩散框架里，GPT 式的规模法则同样成立」</strong>。
      </div>

      <h2 className="section-title">工作流程：图像变成 token 再去噪</h2>
      <Flow
        label="DiT 生成流程（类条件生成）"
        nodes={[
          { title: '纯噪声', desc: '256×256 潜表示' },
          { title: 'Patchify', desc: '切成 2×2 小块 → 256 个视觉 token', hot: true },
          { title: 'DiT Blocks ×N', desc: 'adaLN 注入 t 和类别条件', hot: true },
          { title: '线性层', desc: '每个 token 预测噪声' },
          { title: '去噪一步', desc: '重复 N 步 → 图像浮现' },
        ]}
        arrows={[{ label: '起点' }, { label: 'token 化' }, { label: '全局注意力' }, { label: '输出噪声预测' }]}
      />

      <h2 className="section-title">关键设计：adaLN-Zero</h2>
      <p className="body-text">
        时间步 t 和条件 y 怎么进 Transformer？DiT 的答案是 <strong>adaptive LayerNorm</strong>：
        不把条件当额外 token 拼接，而是用它回归出每层 LayerNorm 的缩放和平移参数，
        让条件「调制」整个网络的每一层。实验证明这比 cross-attention / 拼接 token 都更有效。
      </p>

      <h2 className="section-title">三张表看清与 UNet 版的差别</h2>
      <div className="table-scroll">
      <table className="compare">
        <thead>
          <tr><th>维度</th><th>UNet（SD1.x/2.x）</th><th>DiT（SD3/Sora/Flux）</th></tr>
        </thead>
        <tbody>
          <tr><td>主干网络</td><td>卷积 + 跳连</td><td>全注意力 Transformer</td></tr>
          <tr><td>信息交互</td><td>局部感受野为主</td><td>token 间全局直接交互</td></tr>
          <tr><td>扩展方式</td><td>加通道 / 加分辨率，收益渐缓</td><td>加宽度 / 深度 / token 数，幂律持续</td></tr>
          <tr><td>扩展到视频</td><td>需要额外时序模块</td><td>patch 加一维时间即可（时空 patch）</td></tr>
        </tbody>
      </table>
      </div>

      <h2 className="section-title">核心代码骨架</h2>
      <pre className="code-block" data-lang="python">{CodeDiT}</pre>

      <div className="callout warn">
        <strong>总结一条主线</strong>：Transformer（地基）→ LLM（文本接龙）→ 把图像也 token 化 →
        扩散去噪的活儿也能交给 Transformer → DiT → Sora 把 patch 从空间扩展到时空 → 视频生成。
        一切都是 token 和注意力。
      </div>

      <Quiz
        question="DiT 相比 UNet 扩散模型最大的卖点是什么？"
        options={['生图速度更快', '更好的可扩展性：模型越大质量越好，符合幂律', '不需要文本条件', '显存占用更小']}
        answer={1}
        explain="DiT 论文最重要的发现是扩散模型中的 scaling law，为 Sora 这类大规模视觉模型铺平了道路。"
      />
    </div>
  )
}
