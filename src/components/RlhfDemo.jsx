import { useState } from 'react'

const ROUND = {
  prompt: '用户：怎么让手机电池更耐用？',
  candidates: [
    {
      id: 'A',
      text: '避免极端温度，尽量让电量保持在 20%~80% 之间，长期存放时充到 50% 左右。 lithium 离子电池最怕满电高温存放。',
      reward: 0.9,
      why: '准确、可操作、无废话 —— 人类标注员点 ',
    },
    {
      id: 'B',
      text: '电池耐用的方法有很多！首先要注意充电习惯，其次要注意使用环境，另外还要注意系统设置，还有很多其他方法哦～',
      reward: 0.3,
      why: '正确但全是车轱辘话 —— 人类标注员点 ',
    },
    {
      id: 'C',
      text: '把手机扔了就不用充电了，一劳永逸。（笑）',
      reward: -0.4,
      why: '抖机灵且无信息量 —— 奖励模型重罚',
    },
  ],
}

/** RLHF 互动：用户扮演人类标注员，选出更好的回答 → 展示奖励信号与模型更新 */
export default function RlhfDemo() {
  const [picked, setPicked] = useState(null)

  return (
    <div className="card">
      <h3 className="sub-title">你来当标注员 · 亲手"喂"一次奖励信号</h3>
      <p className="body-text" style={{ marginBottom: 14 }}>
        RLHF 的核心场景：同一个问题让模型生成多个候选回答，人类标注员排序打分，
        奖励模型学习人类偏好，再用强化学习（PPO/DPO）把模型往"人类喜欢的方向"推。
        下面你来当一次标注员：
      </p>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 14, color: 'var(--accent)', marginBottom: 10 }}>
        {ROUND.prompt}
      </div>
      {ROUND.candidates.map(c => {
        const isPicked = picked === c.id
        const isBest = c.reward === 0.9
        const cls =
          picked === null ? 'quiz-option'
          : isPicked ? 'quiz-option correct'
          : isBest ? 'quiz-option correct'
          : 'quiz-option wrong'
        return (
          <div key={c.id} className={cls} style={{ cursor: picked === null ? 'pointer' : 'default' }} onClick={() => picked === null && setPicked(c.id)}>
            <strong>回答 {c.id}</strong>：{c.text}
            {picked !== null && (
              <div style={{ fontSize: 12.5, marginTop: 6, color: 'var(--text-dim)' }}>
                奖励分：{c.reward > 0 ? '+' : ''}{c.reward.toFixed(1)} —— {c.why}
              </div>
            )}
          </div>
        )
      })}
      {picked !== null && (
        <div className="callout ok" style={{ animation: 'fadeInUp 0.5s ease both' }}>
          <strong>训练信号已产生</strong>：策略梯度会提升高奖励回答的生成概率、压低低奖励回答。
          几万轮这样的对比之后，模型就"学会看脸色"了——这就是为什么它礼貌、有条理、不抬杠（大多数时候）。
        </div>
      )}
    </div>
  )
}
