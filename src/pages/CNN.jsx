import ConvSlide from '../components/ConvSlide.jsx'
import PageTitle from '../components/PageTitle.jsx'
import ResidualFlow from '../components/ResidualFlow.jsx'
import Flow from '../components/Flow.jsx'
import Quiz from '../components/Quiz.jsx'

export default function CNN() {
  return (
    <div className="fade-in">
      <PageTitle icon='cnn'>CNN 与深度视觉革命</PageTitle>
      <p className="body-text">
        在 Transformer 统一一切之前，视觉属于卷积神经网络（CNN）。
        2012 年 AlexNet 用 GPU 训练深度 CNN 横扫 ImageNet，错误率骤降 10 个百分点——
        <strong>深度学习时代由此引爆</strong>。ResNet（2015）再补一刀：残差连接让百层网络成为可能。
      </p>

      <h2 className="section-title">卷积：用一个小窗口看世界</h2>
      <ConvSlide />

      <h2 className="section-title">层级特征：从边缘到猫脸</h2>
      <Flow
        label="CNN 层级特征提取"
        nodes={[
          { title: '像素', desc: '原始输入 224×224' },
          { title: '浅层卷积', desc: '边缘 / 颜色 / 斑点', hot: true },
          { title: '中层卷积', desc: '纹理 / 眼睛 / 轮子' },
          { title: '深层卷积', desc: '物体部件 / 整体概念', hot: true },
          { title: '分类头', desc: '"这是一只猫 98%"' },
        ]}
        arrows={[{ label: '输入' }, { label: '局部模式' }, { label: '组合' }, { label: '语义' }]}
      />
      <p className="body-text">
        两个先验撑起了 CNN：<strong>局部性</strong>（相邻像素才相关）和
        <strong>平移不变性</strong>（猫在左上角和右下角都是猫）。权值共享让参数量暴降，
        也让"学视觉"第一次成为可能。
      </p>

      <h2 className="section-title">ResNet：深度的大门</h2>
      <ResidualFlow />

      <h2 className="section-title">从 CNN 到 ViT 的交接棒</h2>
      <div className="table-scroll">
        <table className="compare">
          <thead><tr><th>维度</th><th>CNN</th><th>ViT（2020）</th></tr></thead>
          <tbody>
            <tr><td>核心算子</td><td>局部卷积核</td><td>全局自注意力</td></tr>
            <tr><td>归纳偏置</td><td>强（局部性 + 平移不变）</td><td>弱（全靠数据喂出来）</td></tr>
            <tr><td>小数据表现</td><td>好（先验强）</td><td>差（JFT-300M 级才反超）</td></tr>
            <tr><td>扩展性</td><td>渐缓</td><td>符合 Scaling Law</td></tr>
          </tbody>
        </table>
      </div>
      <div className="callout">
        <strong>交接棒</strong>：ViT 证明"数据够多时，弱先验的全局注意力胜过强先验的卷积"——
        这正是 Bitter Lesson 的又一个注脚。但 CNN 的遗产仍在：ViT 的 patch 切分、
        扩散模型里的下采样结构，处处是卷积时代的影子。
      </div>

      <Quiz
        question="ResNet 的残差连接解决了什么问题？"
        options={['参数量太大', '深层网络梯度消失、难以训练', '过拟合', '计算速度慢']}
        answer={1}
        explain="恒等捷径让梯度无衰减直达底层，且'恒等映射'成为默认解，网络只需学增量。"
      />
    </div>
  )
}
