import { useEffect, useRef, useState } from 'react'
import Icon from './icons'
import { Head2 } from './Sections3D'
import { profile, filters, experience } from './content'
import { prefersReducedMotion, useReveal } from './hooks'

const rich = (s) => s.split(/\*\*(.+?)\*\*/g).map((p, i) => (i % 2 ? <b key={i}>{p}</b> : p))

/* ───────── Hero: giant 3D name, you standing in front, a few tiles ───────── */
export function Hero({ onResume }) {
  const root = useRef(null)
  const book = profile.bookingUrl || `mailto:${profile.email}?subject=Let's talk`
  useEffect(() => {
    const el = root.current
    if (!el) return
    const reduced = prefersReducedMotion()
    const s = { x: 0, y: 0, tx: 0, ty: 0 }
    let last = 0, raf
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      s.tx = ((e.clientX - r.left) / r.width - 0.5) * 2
      s.ty = ((e.clientY - r.top) / r.height - 0.5) * 2
      last = performance.now()
    }
    const tick = (t) => {
      if (t - last > 2500) { // no pointer: sway gently so it still feels 3D on touch screens
        s.tx = Math.sin(t / 2600) * 0.55
        s.ty = Math.cos(t / 3400) * 0.3
      }
      s.x += (s.tx - s.x) * 0.07
      s.y += (s.ty - s.y) * 0.07
      el.style.setProperty('--px', s.x.toFixed(3))
      el.style.setProperty('--py', s.y.toFixed(3))
      raf = requestAnimationFrame(tick)
    }
    if (!reduced) {
      window.addEventListener('pointermove', onMove, { passive: true })
      raf = requestAnimationFrame(tick)
    }
    return () => { window.removeEventListener('pointermove', onMove); cancelAnimationFrame(raf) }
  }, [])
  return (
    <div className="hero3" id="top" ref={root}>
      <span className="h3-hello"><span className="w"><Icon name="wave" size={20} /></span>{profile.greeting}</span>
      <div className="h3-glow" />
      <h1 className="h3-name" aria-label={profile.name}>
        {profile.name.toUpperCase().split('').map((ch, i) => (
          <span key={i} style={{ animationDelay: `${0.15 + i * 0.09}s` }} aria-hidden="true">{ch}</span>
        ))}
      </h1>
      <img className="h3-me" src={profile.cutout} alt="Surya" draggable="false" />
      <div className="h3-tile main">
        <span className="h3-role">{profile.role}</span>
        <p>{rich(profile.tagline)}</p>
        <div className="h3-cta">
          <a className="btn" href={book} {...(profile.bookingUrl ? { target: '_blank', rel: 'noreferrer' } : {})}>Book a Free Meeting <Icon name="arrow" size={16} /></a>
          <button className="btn ghost" onClick={onResume}>View resume</button>
        </div>
      </div>
      <div className="h3-tile now">
        <small>Now</small>
        <b>{profile.now.title}</b>
      </div>
      <div className="h3-tile status">
        <small>Status</small>
        <b><span className="dot" />{profile.status.title}</b>
      </div>
    </div>
  )
}

function R2({ children, className = '', delay = 0 }) {
  const ref = useReveal()
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

/* ───────── Experience: a ledger. Hover or tap a row to open it. ───────── */
export function Experience() {
  const [f, setF] = useState('All')
  const [open, setOpen] = useState('propense')
  const list = experience.filter((e) => f === 'All' || e.tags.includes(f))
  const shown = list.some((e) => e.id === open) ? open : list[0]?.id
  return (
    <section id="experience">
      <div className="wrap">
        <Head2 eyebrow="Career" title="Experience" sub="Where I have built and shipped." />
        <div className="pills" role="tablist" aria-label="Filter experience">
          {filters.map((x) => <button key={x} className={f === x ? 'on' : ''} onClick={() => setF(x)} aria-pressed={f === x}>{x}</button>)}
        </div>
        <ol className="ledger">
          {list.map((e, i) => (
            <li key={e.id} className={`lrow ${shown === e.id ? 'open' : ''}`} style={{ '--c': e.color }} onMouseEnter={() => setOpen(e.id)}>
              <button className="lhead" onClick={() => setOpen(e.id)} aria-expanded={shown === e.id}>
                <span className="lno">0{i + 1}</span>
                <span className="lco">
                  <b>{e.company}</b>
                  <small>{e.role} · {e.place}</small>
                </span>
                <span className="lper">{e.period}</span>
                <span className="lar"><Icon name="arrow" size={20} /></span>
              </button>
              <div className="lbody">
                <div className="lin">
                  <p>{rich(e.text)}</p>
                  <div className="lmet">
                    {e.metrics.map((m) => <div key={m.l}><b>{m.v}</b><span>{m.l}</span></div>)}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
