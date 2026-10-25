import { useEffect, useRef } from 'react'

/** 黑客帝国风格字符雨背景（低透明度装饰） */
export default function MatrixRain() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let raf
    const fontSize = 15
    let cols, drops
    const chars = 'アイウエオカキクケコ01<>{}[]=/\\+*#$1024AI'.split('')

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      cols = Math.ceil(canvas.width / fontSize)
      drops = Array.from({ length: cols }, () => Math.random() * -100)
    }
    resize()
    window.addEventListener('resize', resize)

    let last = 0
    function draw(t) {
      raf = requestAnimationFrame(draw)
      if (t - last < 66) return // ~15fps，够用且省电
      last = t
      // 残影层与主题底色一致，避免亮色主题下黑 canvas 变成灰块
      const light = document.documentElement.dataset.theme === 'light'
      ctx.fillStyle = light ? 'rgba(250, 250, 250, 0.14)' : 'rgba(0, 0, 0, 0.14)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = `${fontSize}px monospace`
      for (let i = 0; i < cols; i++) {
        const ch = chars[(Math.random() * chars.length) | 0]
        const y = drops[i] * fontSize
        ctx.fillStyle = light
          ? (Math.random() > 0.975 ? '#7c5cff' : 'rgba(124, 92, 255, 0.35)')
          : (Math.random() > 0.975 ? '#bafff4' : '#1d7a6f')
        ctx.fillText(ch, i * fontSize, y)
        if (y > canvas.height && Math.random() > 0.976) drops[i] = 0
        drops[i]++
      }
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} className="matrix-bg" aria-hidden="true" />
}
