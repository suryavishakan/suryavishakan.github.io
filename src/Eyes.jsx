import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from './hooks'

/**
 * Two eyes whose pupils follow the cursor (or a finger on touch screens).
 * When nobody is moving a pointer they wander a little, and they blink now and then.
 * Click or tap to make them go wide-eyed.
 */
export default function Eyes() {
  const wrap = useRef(null)
  const eyes = useRef([])
  const pupils = useRef([])

  useEffect(() => {
    const reduced = prefersReducedMotion()
    const state = pupils.current.map(() => ({ x: 0, y: 0, tx: 0, ty: 0 }))
    let target = null // last pointer position in viewport coordinates
    let lastMove = 0
    let raf
    let blinkTimer
    let surpriseTimer

    const onMove = (e) => {
      const p = e.touches ? e.touches[0] : e
      target = { x: p.clientX, y: p.clientY }
      lastMove = performance.now()
    }
    const onDown = () => {
      wrap.current?.classList.add('surprised')
      clearTimeout(surpriseTimer)
      surpriseTimer = setTimeout(() => wrap.current?.classList.remove('surprised'), 450)
    }

    const blink = () => {
      wrap.current?.classList.add('blink')
      setTimeout(() => wrap.current?.classList.remove('blink'), 160)
      blinkTimer = setTimeout(blink, 2600 + Math.random() * 3800)
    }

    const tick = (t) => {
      const idle = !target || t - lastMove > 2800
      pupils.current.forEach((p, i) => {
        const eye = eyes.current[i]
        if (!eye || !p) return
        const r = eye.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const reach = r.width * 0.2 // how far a pupil can travel from the centre
        let dx, dy
        if (idle) {
          // gentle wandering when nobody is pointing
          dx = Math.sin(t / 1700 + i) * 0.55
          dy = Math.cos(t / 2300 + i * 2) * 0.35 + 0.15
        } else {
          const vx = target.x - cx
          const vy = target.y - cy
          const dist = Math.hypot(vx, vy) || 1
          const k = Math.min(1, dist / (r.width * 1.4))
          dx = (vx / dist) * k
          dy = (vy / dist) * k
        }
        const s = state[i]
        s.tx = dx * reach
        s.ty = dy * reach
        s.x += (s.tx - s.x) * 0.16
        s.y += (s.ty - s.y) * 0.16
        p.style.transform = `translate(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px)`
      })
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    if (!reduced) {
      raf = requestAnimationFrame(tick)
      blinkTimer = setTimeout(blink, 2200)
    }
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(blinkTimer)
      clearTimeout(surpriseTimer)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [])

  return (
    <div className="eyes" ref={wrap} role="img" aria-label="Two friendly eyes that follow your cursor">
      {[0, 1].map((i) => (
        <div className="eye" key={i} ref={(el) => (eyes.current[i] = el)}>
          <div className="pupil" ref={(el) => (pupils.current[i] = el)}>
            <span className="glint" />
          </div>
          <span className="lid" />
        </div>
      ))}
    </div>
  )
}