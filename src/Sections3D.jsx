import { useRef, useState } from 'react'
import Icon from './icons'
import Art from './art'
import { process, services, profile } from './content'
import { prefersReducedMotion, useReveal, useScrollEffect } from './hooks'

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))

/* ───────── How I work: cards that stack as you scroll ───────── */
const SCENES = [
  { bg: '#0e0f13', ink: '#fff', mute: '#b6bac3', accent: '#9b7bff' },
  { bg: '#e7e1ff', ink: '#1c1550', mute: '#4a4380', accent: '#5b3dff' },
  { bg: '#ffd9c2', ink: '#3a1a0c', mute: '#7a4a33', accent: '#e0573a' },
]

function Scene({ i, c }) {
  if (i === 0)
    return (
      <svg viewBox="0 0 320 240" className="sc-art">
        {[[60, 60], [160, 40], [260, 80], [90, 160], [200, 170], [270, 190]].map(([x, y], k) => (
          <circle key={k} cx={x} cy={y} r="11" fill={c.accent} className="pulse" style={{ animationDelay: `${k * 0.25}s` }} />
        ))}
        {[[60, 60, 160, 40], [160, 40, 260, 80], [60, 60, 90, 160], [160, 40, 200, 170], [260, 80, 270, 190], [90, 160, 200, 170], [200, 170, 270, 190]].map(([a, b, d, e], k) => (
          <line key={k} x1={a} y1={b} x2={d} y2={e} stroke={c.ink} strokeOpacity=".45" strokeWidth="2" strokeDasharray="6 6" className="dash" />
        ))}
        <circle cx="160" cy="40" r="22" fill="none" stroke={c.accent} strokeWidth="2.5" className="ring" />
      </svg>
    )
  if (i === 1)
    return (
      <svg viewBox="0 0 320 240" className="sc-art">
        {[70, 110, 90, 150, 130, 190].map((h, k) => (
          <rect key={k} x={30 + k * 46} y={210 - h} width="30" height={h} rx="8" fill={k === 5 ? c.accent : 'rgba(28,21,80,.25)'} className="bar" style={{ animationDelay: `${k * 0.12}s`, transformOrigin: `${45 + k * 46}px 210px` }} />
        ))}
        <path d="M30 150l46-30 46 14 46-50 46 20 46-56" fill="none" stroke={c.ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="400" className="draw" />
        <text x="290" y="38" fill={c.ink} fontSize="14" fontWeight="800" textAnchor="end" fontFamily="Bricolage Grotesque, Inter, system-ui, sans-serif">p99 ↓ 47%</text>
      </svg>
    )
  return (
    <svg viewBox="0 0 320 240" className="sc-art">
      <path d="M40 120h240" stroke={c.ink} strokeOpacity=".4" strokeWidth="3" strokeDasharray="6 8" />
      {['commit', 'review', 'deploy'].map((t, k) => (
        <g key={t}>
          <circle cx={60 + k * 100} cy="120" r="30" fill={k === 2 ? c.accent : '#fff'} />
          <text x={60 + k * 100} y="125" textAnchor="middle" fontSize="12" fontWeight="800" fill={k === 2 ? '#fff' : c.ink} fontFamily="Bricolage Grotesque, Inter, system-ui, sans-serif">{t}</text>
        </g>
      ))}
      <circle r="8" fill={c.ink} className="runner" cx="60" cy="120" />
      <path d="M260 90a60 60 0 0 0-200 0" fill="none" stroke={c.ink} strokeOpacity=".5" strokeWidth="2.5" strokeDasharray="4 7" />
      <text x="160" y="46" textAnchor="middle" fontSize="12" fontWeight="700" fill={c.ink} fontFamily="Bricolage Grotesque, Inter, system-ui, sans-serif">learn · fix · repeat</text>
    </svg>
  )
}

export function How() {
  const cards = useRef([])
  useScrollEffect(() => {
    if (prefersReducedMotion()) return
    cards.current.forEach((el, i) => {
      const next = cards.current[i + 1]
      if (!el || !next) return
      const stick = 110 + (i + 1) * 26
      const t = clamp(1 - (next.getBoundingClientRect().top - stick) / 460)
      el.style.transform = `scale(${1 - t * 0.07}) translateY(${-t * 8}px)`
      el.style.filter = `brightness(${1 - t * 0.18})`
    })
  })
  return (
    <section className="alt how2" id="how">
      <div className="wrap">
        <Head2 eyebrow="Approach" title="How I Work" sub="Three habits that show up in every project." />
        <div className="stack">
          {process.map((s, i) => {
            const c = SCENES[i]
            return (
              <div className="scard" key={s.title} ref={(el) => (cards.current[i] = el)} style={{ top: 110 + i * 26, background: c.bg, color: c.ink }}>
                <div className="sc-l">
                  <span className="sc-n" style={{ color: c.accent }}>0{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p style={{ color: c.mute }}>{s.text}</p>
                  <span className="sc-ic" style={{ background: c.accent, color: '#fff' }}><Icon name={s.icon} size={22} /></span>
                </div>
                <div className="sc-r"><Scene i={i} c={c} /></div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function Head2({ eyebrow, title, sub }) {
  const ref = useReveal()
  return (
    <div ref={ref} className="reveal head">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {sub && <p>{sub}</p>}
    </div>
  )
}

/* ───────── Ways to work together: pick one, the panel tilts in 3D ───────── */
export function Services() {
  const [sel, setSel] = useState(0)
  const panel = useRef(null)
  const s = services[sel]
  const move = (e) => {
    if (prefersReducedMotion() || e.pointerType === 'touch' || !panel.current) return
    const r = panel.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    panel.current.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`
  }
  const reset = () => panel.current && (panel.current.style.transform = '')
  const mail = `mailto:${profile.email}?subject=${encodeURIComponent('Working together: ' + s.title)}`
  return (
    <section id="services">
      <div className="wrap">
        <Head2 eyebrow="Services" title="Ways to Work Together" sub="Choose what fits your project. They combine well." />
        <div className="sv">
          <div className="sv-list" role="tablist" aria-label="Ways to work together">
            {services.map((x, i) => (
              <button key={x.title} role="tab" aria-selected={sel === i} className={`sv-i ${sel === i ? 'on' : ''}`} onClick={() => setSel(i)} onMouseEnter={() => setSel(i)}>
                <span className="n">0{i + 1}</span>
                <span className="t"><b>{x.title}</b><small>{x.text}</small></span>
                <span className="a"><Icon name="arrow" size={18} /></span>
              </button>
            ))}
          </div>
          <div className="sv-stage" onPointerMove={move} onPointerLeave={reset}>
            <div className="sv-panel" ref={panel} style={{ background: `linear-gradient(135deg,${s.g[0]},${s.g[1]})` }}>
              <div className="sv-art" key={'a' + sel}><Art kind={s.art} /></div>
              <div className="sv-info" key={'i' + sel}>
                <ul>{s.points.map((p) => <li key={p}><Icon name="check" size={16} />{p}</li>)}</ul>
                <a className="btn" href={mail}>Discuss this <Icon name="arrow" size={16} /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
