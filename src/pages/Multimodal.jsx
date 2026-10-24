import ClipMatchDemo from '../components/ClipMatchDemo.jsx'
import Flow from '../components/Flow.jsx'
import Quiz from '../components/Quiz.jsx'

const CodeClip = `# CLIP 双塔结构：图像塔 + 文本塔，各自编码后算相似度
import torch

class CLIP(torch.nn.Module):
    def __init__(self):
        self.image_encoder = ViT()      # 图像 → 向量 (Vision Transformer)
        self.text_encoder  = TextTransformer()  # 文本 → 向量

    def forward(self, images, texts):
        img_emb = normalize(self.image_encoder(images))  # [B, D]
        txt_emb = normalize(self.text_encoder(texts))    # [B, D]
        logits = img_emb @ txt_emb.T * 100               # 余弦相似度矩阵
        # 对角线是配对样本 → 交叉熵，拉近配对、推远不配对
        loss = cross_entropy(logits, labels=arange(B))
        return loss

# 训练数据：4 亿网络图文对（无需人工标注！）
# 图像塔后来直接变成了 SD / DiT 的文本-图像对齐基础`

export default function Multimodal() {
  return (
    <div className="fade-in">
      <h1 className="hero-title" style={{ fontSize: 'clamp(26px,4vw,40px)' }}>🌉 多模态与 CLIP：让图像和文字说同一种语言</h1>
      <p className="body-text">
        前面所有主题都在处理文字或图像的"单声道"，多模态要解决的是<strong>翻译问题</strong>：
        图像的像素和文字的 token 是两种完全不同的信号，怎么让它们对上话？
        2021 年 OpenAI 的 <strong>CLIP</strong> 给出了工业级答案，也直接催生了 Stable Diffusion。
      </p>

      <h2 className="section-title">双塔结构：各编码，再对齐</h2>
      <Flow
        label="CLIP 对比学习"
        nodes={[
          { title: '图像', desc: '像素输入' },
          { title: '图像编码器 ViT', desc: '图像 → 向量', hot: true },
          { title: '共享语义空间', desc: '余弦相似度对齐', hot: true },
          { title: '文本编码器', desc: '文字 → 向量', hot: true },
          { title: '文字', desc: '"一只戴墨镜的猫"' },
        ]}
        arrows={[{ label: '左塔' }, { label: '编码' }, { label: '拉近 ✓ 推远 ✗' }, { label: '编码' }, { label: '右塔' }]}
      />
      <p className="body-text">
        训练技巧非常暴力又优雅：<strong>对比学习</strong>。拿一个 batch 的 N 对图文，构造 N×N 相似度矩阵，
        对角线（正确配对）拉近、其余推远。就这么在海量数据上刷出来跨模态对齐能力——
        而且用的是网上现成的图文对，<strong>零人工标注</strong>。
      </p>

      <h2 className="section-title">实验：图文相似度长什么样</h2>
      <ClipMatchDemo />

      <h2 className="section-title">多模态的三条路线</h2>
      <div className="tag-grid">
        <div className="tag-card">
          <h4>① 理解类：图文对齐</h4>
          <p>CLIP、SigLIP。输出是向量相似度，擅长搜索、分类、零样本识别。SD 的文本理解就靠它。</p>
        </div>
        <div className="tag-card">
          <h4>② 输入扩展：视觉语言模型</h4>
          <p>GPT-4V、LLaVA：把图像编码成"视觉 token"塞进 LLM 上下文，让 LLM 直接"看图说话"。</p>
        </div>
        <div className="tag-card">
          <h4>③ 生成类：文生图/视频</h4>
          <p>SD、DALL·E、Sora：CLIP 文本编码当条件，扩散模型负责画。这条线已经演化到 DiT 了。</p>
        </div>
      </div>

      <h2 className="section-title">核心代码骨架</h2>
      <pre className="code-block" data-lang="python">{CodeClip}</pre>

      <div className="callout">
        <strong>一个伏笔</strong>：CLIP 的图像编码器是 ViT——把图像切成 16×16 patch 当 token 处理的 Transformer。
        这个"图像 token 化"的思想后来被 DiT 继承：既然 patch 能做判别，也能做扩散去噪。
        <strong>多模态的尽头，还是 token 和注意力。</strong>
      </div>

      <Quiz
        question="CLIP 为什么不需要人工标注就能训练？"
        options={['标注员偷偷标了', '直接使用互联网上自然存在的图文对，对比学习自动学习配对关系', '它不需要训练', '用强化学习自我博弈']}
        answer={1}
        explain="alt 文本、配图说明都是天然标签，4 亿规模的对齐信号免费拿。"
      />
    </div>
  )
}
