import { useEffect, useRef, useState } from 'react'
import Icon from './icons'
import { Head2 } from './Sections3D'
import { education, skills } from './content'
import { prefersReducedMotion, useReveal, useScrollEffect } from './hooks'

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const PITCH = 220

/* ───────── Academic journey: a winding path that draws as you scroll ───────── */
function pathD(n) {
  let d = 'M60 0'
  for (let i = 0; i < n; i++) {
    const y = i * PITCH
    const dir = i % 2 ? -1 : 1
    d += ` C ${60 + 55 * dir} ${y + 70} ${60 - 55 * dir} ${y + PITCH - 70} 60 ${y + PITCH}`
  }
  return d
}

export function Academic() {
  const wrap = useRef(null)
  const base = useRef(null)
  const fill = useRef(null)
  const marker = useRef(null)
  const [reached, setReached] = useState(0)
  const [sel, setSel] = useState(null)
  const n = education.length

  useScrollEffect(() => {
    if (!wrap.current || !fill.current) return
    const r = wrap.current.getBoundingClientRect()
    const p = prefersReducedMotion() ? 1 : clamp((window.innerHeight * 0.62 - r.top) / r.height)
    const len = fill.current.getTotalLength()
    wrap.current.style.setProperty('--p', p)
    fill.current.style.strokeDasharray = len
    fill.current.style.strokeDashoffset = len * (1 - p)
    const pt = fill.current.getPointAtLength(len * p)
    if (marker.current) marker.current.style.transform = `translate(${pt.x}px, ${pt.y}px)`
    setReached(education.filter((_, i) => p >= (i + 0.5) / n - 0.02).length)
  })

  return (
    <section id="journey">
      <div className="wrap">
        <Head2 eyebrow="Education" title="Academic Journey" sub="Where I studied and where I put it to work." />
        <div className="path" ref={wrap} style={{ '--n': n, '--pitch': PITCH + 'px' }}>
          <svg className="path-svg" viewBox={`0 0 120 ${n * PITCH}`} preserveAspectRatio="xMidYMin meet" aria-hidden="true">
            <path ref={base} d={pathD(n)} className="p-base" />
            <path ref={fill} d={pathD(n)} className="p-fill" />
            <g ref={marker} className="p-mk"><circle r="14" /><text y="5" textAnchor="middle">★</text></g>
          </svg>
          {education.map((e, i) => (
            <div key={e.school} className={`stop ${i % 2 ? 'r' : 'l'} ${reached > i ? 'on' : ''} ${sel === i ? 'sel' : ''}`} style={{ top: i * PITCH + PITCH / 2 }}>
              <span className="dotn"><Icon name={e.icon} size={18} /></span>
              <button className="scard2" onClick={() => setSel(sel === i ? null : i)} onMouseEnter={() => setSel(i)} onMouseLeave={() => setSel(null)} aria-expanded={sel === i}>
                <span className="yr">{e.years}<em>{e.tag}</em></span>
                <b>{e.degree}</b>
                <span className="sch">{e.school}</span>
                <span className="pl">{e.place}</span>
                <span className="nt">{e.note}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────── Tools: a 3D globe of chips. Drag it, or just let it turn. ───────── */
const R = 285
const BOX = { w: 860, h: 700 }
const CHIPS = (() => {
  const all = skills.flatMap((g, k) => g.items.map((label) => ({ label, k, color: g.color })))
  const n = all.length
  return all.map((c, i) => {
    const y = 1 - (2 * (i + 0.5)) / n
    const r = Math.sqrt(1 - y * y)
    const phi = i * Math.PI * (3 - Math.sqrt(5))
    return { ...c, x: Math.cos(phi) * r, y, z: Math.sin(phi) * r }
  })
})()

const WIRES = (() => {
  const out = []
  const N = 48
  for (let k = 0; k < 12; k++) { // meridians
    const lon = (k / 12) * Math.PI
    out.push(Array.from({ length: N + 1 }, (_, i) => {
      const t = (i / N) * Math.PI * 2
      return [Math.cos(t) * Math.cos(lon), Math.sin(t), Math.cos(t) * Math.sin(lon)]
    }))
  }
  for (const lat of [-1.05, -0.52, 0, 0.52, 1.05]) { // parallels
    out.push(Array.from({ length: N + 1 }, (_, i) => {
      const t = (i / N) * Math.PI * 2
      return [Math.cos(t) * Math.cos(lat), Math.sin(lat), Math.sin(t) * Math.cos(lat)]
    }))
  }
  return out
})()

export function Skills() {
  const els = useRef([])
  const wires = useRef([])
  const box = useRef(null)
  const st = useRef({ ay: 0, ax: 0.35, vy: 0.22, vx: 0, speed: 1, target: 1, drag: null, scroll: 0 })
  const [focus, setFocus] = useState(null)
  const [scale, setScale] = useState(1)
  const focusRef = useRef(null)
  focusRef.current = focus

  useScrollEffect((y) => { st.current.scroll = y })
  useEffect(() => {
    const fit = () => box.current && setScale(Math.min(1, box.current.clientWidth / BOX.w))
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  useEffect(() => {
    const reduced = prefersReducedMotion()
    let raf, last = performance.now(), lastScroll = 0
    const draw = () => {
      const s = st.current
      const cy = Math.cos(s.ay), sy = Math.sin(s.ay), cx = Math.cos(s.ax), sx = Math.sin(s.ax)
      CHIPS.forEach((c, i) => {
        const el = els.current[i]
        if (!el) return
        const x1 = c.x * cy + c.z * sy
        const z1 = -c.x * sy + c.z * cy
        const y2 = c.y * cx - z1 * sx
        const z2 = c.y * sx + z1 * cx
        const depth = (z2 + 1) / 2
        el.style.transform = `translate(${(BOX.w / 2 + x1 * R).toFixed(1)}px, ${(BOX.h / 2 + y2 * R).toFixed(1)}px) translate(-50%,-50%) scale(${(0.62 + depth * 0.6).toFixed(3)})`
        el.style.zIndex = String(Math.round(depth * 100))
        const dim = focusRef.current !== null && focusRef.current !== c.k
        el.style.opacity = dim ? '0.12' : String((0.3 + depth * 0.7).toFixed(2))
      })
      // wireframe sphere (meridians + parallels) rotating with the chips
      const proj = (x, y, z) => {
        const x1 = x * cy + z * sy, z1 = -x * sy + z * cy
        return [BOX.w / 2 + x1 * R, BOX.h / 2 + (y * cx - z1 * sx) * R]
      }
      WIRES.forEach((pts, i) => {
        const p = wires.current[i]
        if (!p) return
        p.setAttribute('d', pts.map(([x, y, z], j) => { const [X, Y] = proj(x, y, z); return `${j ? 'L' : 'M'}${X.toFixed(1)} ${Y.toFixed(1)}` }).join(''))
      })
    }
    const tick = (t) => {
      const dt = Math.min(0.05, (t - last) / 1000); last = t
      const s = st.current
      s.speed += (s.target - s.speed) * 0.08
      if (!s.drag) {
        s.vy += (0.22 - s.vy) * 0.02
        s.vx += (0 - s.vx) * 0.04
        s.ax += (0.35 - s.ax) * 0.01
        s.ay += s.vy * dt * s.speed
        s.ax += s.vx * dt
      }
      s.ay += (s.scroll - lastScroll) * 0.0035 // scrolling spins the globe
      lastScroll = s.scroll
      draw()
      raf = requestAnimationFrame(tick)
    }
    draw()
    if (!reduced) raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const down = (e) => { st.current.drag = { x: e.clientX, y: e.clientY }; e.currentTarget.setPointerCapture?.(e.pointerId) }
  const move = (e) => {
    const d = st.current.drag
    if (!d) return
    const dx = e.clientX - d.x, dy = e.clientY - d.y
    d.x = e.clientX; d.y = e.clientY
    st.current.ay += dx * 0.008
    st.current.ax = Math.max(-1.1, Math.min(1.1, st.current.ax + dy * 0.008))
    st.current.vy = dx * 0.6
    st.current.vx = dy * 0.4
  }
  const up = () => { st.current.drag = null }

  return (
    <section className="alt skills" id="skills">
      <div className="wrap">
        <Head2 eyebrow="Toolbox" title="Tools & Capabilities" sub="The languages, platforms and practices I build with." />
        <div className="gl-wrap" ref={box} style={{ height: BOX.h * scale }}>
          <div
            className="gl" style={{ width: BOX.w, height: BOX.h, transform: `scale(${scale})` }}
            onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}
            onPointerEnter={() => (st.current.target = 0.25)} onPointerLeave={() => { st.current.target = 1; up() }}
          >
            <svg className="gl-wire" width={BOX.w} height={BOX.h} aria-hidden="true">
              <defs>
                <radialGradient id="glb" cx="38%" cy="32%" r="75%">
                  <stop offset="0" stopColor="#8b6cff" stopOpacity=".28" />
                  <stop offset="1" stopColor="#5b3dff" stopOpacity=".04" />
                </radialGradient>
              </defs>
              <circle cx={BOX.w / 2} cy={BOX.h / 2} r={R} fill="url(#glb)" />
              {WIRES.map((_, i) => <path key={i} ref={(el) => (wires.current[i] = el)} />)}
              <circle cx={BOX.w / 2} cy={BOX.h / 2} r={R} className="gl-rim" />
            </svg>
            {CHIPS.map((c, i) => (
              <span key={c.label} ref={(el) => (els.current[i] = el)} className="glchip" style={{ '--c': c.color }}>{c.label}</span>
            ))}
          </div>
        </div>
        <div className="gal-key">
          {skills.map((g, k) => (
            <button key={g.group} className={focus === k ? 'on' : ''} style={{ '--c': g.color }} onMouseEnter={() => setFocus(k)} onMouseLeave={() => setFocus(null)} onFocus={() => setFocus(k)} onBlur={() => setFocus(null)}>
              <i />{g.group}<small>{g.items.length}</small>
            </button>
          ))}
        </div>
        <div className="gal-flat">
          {skills.map((g) => (
            <div className="gf" key={g.group} style={{ '--c': g.color }}>
              <h4>{g.group}</h4>
              <div>{g.items.map((t) => <span key={t} className="gchip2">{t}</span>)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
