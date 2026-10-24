import { useState } from 'react'

/** 单选题小测验组件 */
export default function Quiz({ question, options, answer, explain }) {
  const [picked, setPicked] = useState(null)

  return (
    <div className="card" style={{ borderColor: 'var(--accent-2)' }}>
      <h3 className="sub-title">🧠 随堂测验</h3>
      <p className="body-text" style={{ color: 'var(--text)' }}>{question}</p>
      {options.map((op, i) => {
        const isAnswer = i === answer
        const cls =
          picked === null ? 'quiz-option'
          : isAnswer ? 'quiz-option correct'
          : picked === i ? 'quiz-option wrong'
          : 'quiz-option'
        return (
          <button key={i} className={cls} disabled={picked !== null} onClick={() => setPicked(i)}>
            {String.fromCharCode(65 + i)}. {op}
          </button>
        )
      })}
      <div className="quiz-feedback">
        {picked !== null && (
          picked === answer
            ? `✅ 答对了！${explain}`
            : `❌ 再想想 —— ${explain}`
        )}
      </div>
    </div>
  )
}
