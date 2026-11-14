import { useEffect, useRef, useState } from 'react'
import Icon from './icons'
import Eyes from './Eyes'
import { Head2 } from './Sections3D'
import { profile, filters, experience } from './content'
import { prefersReducedMotion, useReveal } from './hooks'

const rich = (s) => s.split(/\*\*(.+?)\*\*/g).map((p, i) => (i % 2 ? <b key={i}>{p}</b> : p))

/* ───────── Hero: centered, quiet, eyes that follow the cursor ───────── */
export function Hero({ onResume }) {
  const book = profile.bookingUrl || `mailto:${profile.email}?subject=Let's talk`
  return (
    <>
    <div className="hero" id="top">
      <div className="wrap">
        <span className="hello"><span className="w"><Icon name="wave" size={20} /></span>{profile.greeting}</span>
        <h1>I'm {profile.name}</h1>
        <div className="chips">
          <span className="chip-sq" style={{ background: '#ffd9c2', color: '#c2542d' }}><Icon name="brief" size={24} /></span>
          <span className="chip-pill">{profile.role}</span>
          <span className="chip-sq" style={{ background: '#cfe3ff', color: '#1d4ed8' }}><Icon name="spark" size={24} /></span>
        </div>
        <p className="tagline">{rich(profile.tagline)}</p>
        <div className="h2-cta" style={{ justifyContent: 'center' }}>
          <a className="btn dark" href={book} {...(profile.bookingUrl ? { target: '_blank', rel: 'noreferrer' } : {})}>
            Book a Free Meeting <Icon name="arrow" size={16} />
          </a>
        </div>
        <Eyes />
      </div>
    </div>
    <div className="strip">
      <div className="wrap cards3">
        <R2 className="info">
          <div><small>Status</small><h3>{profile.status.title}</h3><p>{profile.status.note}</p></div>
          <span className="badge"><span className="dot" />{profile.status.label}</span>
        </R2>
        <R2 className="info darkc" delay={80}>
          <div><small>Now</small><h3>{profile.now.title}</h3></div>
          <p>{profile.now.note}</p>
        </R2>
      </div>
    </div>
    </>
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