import DiffusionDemo from '../components/DiffusionDemo.jsx'
import PageTitle from '../components/PageTitle.jsx'
import Flow from '../components/Flow.jsx'
import Quiz from '../components/Quiz.jsx'

const CodeSD = `# Stable Diffusion 的核心思想：在潜空间(Latent)里做扩散
# 1. VAE Encoder 把 512x512 图像压成 64x64 潜空间表示 (压缩 48 倍!)
# 2. UNet 在潜空间迭代去噪，Condition 注入文本引导
# 3. VAE Decoder 把潜表示还原成图像

prompt = "a cat wearing sunglasses, 1024 programmer day"
latents = torch.randn(1, 4, 64, 64)          # 从纯噪声开始
text_emb = text_encoder(prompt)              # CLIP 文本编码器

for t in scheduler.timesteps:                # 通常 20~50 步
    noise_pred = unet(latents, t, text_emb)  # 预测当前噪声
    latents = scheduler.step(noise_pred, t, latents)

image = vae_decoder(latents)                 # 潜空间 → 像素图像`

export default function StableDiffusion() {
  return (
    <div className="fade-in">
      <PageTitle icon='diffusion'>Stable Diffusion：把噪声炼成图</PageTitle>
      <p className="body-text">
        前面讲了「文字接龙」，那 AI 画画是怎么画的？答案是<strong>扩散模型</strong>：
        正向过程不断给图像加噪声直到变成雪花屏；训练一个网络学会这个「加噪」的逆操作；
        生成时从纯噪声出发，一步步减噪，图像就从混沌中浮现。2022 年开源的 Stable Diffusion
        让这一切跑进了消费级显卡。
      </p>

      <h2 className="section-title">先动手：亲手去噪一只猫</h2>
      <DiffusionDemo />

      <h2 className="section-title">三大件是怎么配合的？</h2>
      <Flow
        label="Stable Diffusion 推理全流程"
        nodes={[
          { title: '文本提示词', desc: '"戴墨镜的猫"' },
          { title: 'CLIP 文本编码器', desc: '文字 → 语义向量', hot: true },
          { title: 'UNet 去噪 ×N 步', desc: '在潜空间迭代减噪', hot: true },
          { title: 'VAE Decoder', desc: '潜表示 → 512×512 图像' },
          { title: '成品图像', desc: '生成完毕' },
        ]}
        arrows={[{ label: '输入' }, { label: '作为条件注入' }, { label: '逐步引导' }, { label: '解码还原' }]}
      />

      <div className="tag-grid">
        <div className="tag-card">
          <h4>VAE · 变分自编码器</h4>
          <p>图像 512×512×3 ≈ 78 万个数字，太大。VAE 把它压到 64×64×4 的「潜空间」，计算量降近 50 倍——这就是 SD 名字里 "Latent" 的含义。</p>
        </div>
        <div className="tag-card">
          <h4>CLIP · 文本图像桥梁</h4>
          <p>用数亿图文对训练出来的对齐模型，让「文字向量」和「图像向量」说同一种语言，文本才能引导画面。</p>
        </div>
        <div className="tag-card">
          <h4>UNet · 去噪主力</h4>
          <p>带跳连的卷积网络，每一步预测「当前图里混了多少噪声」，训练目标是拟合加噪的逆过程。</p>
        </div>
      </div>

      <h2 className="section-title">为什么是"逐步去噪"而不是一步生成？</h2>
      <p className="body-text">
        把「从噪声直接映射到图像」当一个问题，映射复杂到学不动；但「只去掉一点点噪声」是个简单得多的任务。
        扩散模型把它拆成几百个小步，每步只修正一点，<strong>用推理时间换生成质量</strong>——
        这也是 SD 生图要几秒到几十秒的原因。后来者（如一致性模型、DiT 配新采样器）一直在压缩步数。
      </p>

      <h2 className="section-title">核心代码骨架</h2>
      <pre className="code-block" data-lang="python">{CodeSD}</pre>

      <div className="callout">
        <strong>CFG（Classifier-Free Guidance）彩蛋</strong>：
        生成时同时算「有提示词」和「无提示词」两个预测，然后放大两者之差——
        CFG scale 越高图像越"听话"但越容易过冲，这是每个 SD 用户都调过的滑块。
      </div>

      <Quiz
        question="Stable Diffusion 名字里的 'Latent' 指什么？"
        options={['潜空间：扩散发生在压缩后的低维表示上', '隐藏层：网络层数是保密的', '潜在风险：生成内容有版权问题', '延迟：模型推理速度很慢']}
        answer={0}
        explain="VAE 把像素空间压缩约 48 倍再去做扩散，大幅省算力，这正是它能在消费级显卡上跑起来的关键。"
      />
    </div>
  )
}
