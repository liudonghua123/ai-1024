import { useEffect } from 'react'

/** 滚动进入动画：给 .reveal 元素挂 IntersectionObserver */
export default function useReveal(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.in)')
    if (!els.length) return
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          io.unobserve(e.target)
        }
      })
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.05 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, deps)
}
