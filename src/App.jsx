import { useEffect, useRef, useState } from 'react'
import Icon from './icons'
import ResumeModal from './ResumeModal'
import { How, Services } from './Sections3D'
import { Academic, Skills } from './Sections2'
import { Hero, Experience } from './Sections4'
import Art from './art'
import { useReveal, useActiveSection, useTheme, prefersReducedMotion, useScrollEffect } from './hooks'
import { profile, filters, experience, projects, tags } from './content'

/** Turns **bold** markers into <b>. */
const rich = (s) => s.split(/\*\*(.+?)\*\*/g).map((p, i) => (i % 2 ? <b key={i}>{p}</b> : p))

function R({ children, className = '', delay = 0, as: Tag = 'div', ...rest }) {
  const ref = useReveal()
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  )
}

const Head = ({ eyebrow, title, sub }) => (
  <R className="head">
    <span className="eyebrow">{eyebrow}</span>
    <h2>{title}</h2>
    {sub && <p>{sub}</p>}
  </R>
)

const NAV = [
  ['experience', 'Experience'],
  ['projects', 'Projects'],
    ['how', 'How I Work'],
  ['services', 'Work With Me'],
]

function Nav({ theme, toggleTheme, onResume }) {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(NAV.map((n) => n[0]))
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])
  return (
    <>
      <header className="nav">
        <a href="#top" className="logo" aria-label="Home">{profile.name}</a>
        <nav className="pill-nav" aria-label="Main">
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? 'on' : ''}>{label}</a>
          ))}
        </nav>
        <div className="nav-r">
          <button className="round soft" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
          </button>
          <button className="btn dark hide-m" onClick={onResume}>Resume</button>
          <button className="round burger" onClick={() => setOpen(true)} aria-label="Open menu"><Icon name="menu" /></button>
        </div>
      </header>
      <div className={`sheet ${open ? 'open' : ''}`} aria-hidden={!open}>
        <button className="round soft x" onClick={() => setOpen(false)} aria-label="Close menu"><Icon name="close" /></button>
        {NAV.map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>
        ))}
        <a href="#top" onClick={(e) => { e.preventDefault(); setOpen(false); onResume() }}>Resume</a>
      </div>
    </>
  )
}

function Project({ p }) {
  const card = useRef(null)
  const move = (e) => {
    if (prefersReducedMotion() || e.pointerType === 'touch') return
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    card.current.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`
  }
  const reset = () => { if (card.current) card.current.style.transform = '' }
  const Tag = p.url ? 'a' : 'div'
  return (
    <div className="proj" onPointerMove={move} onPointerLeave={reset}>
      <Tag className="in-card" ref={card} style={{ display: 'block' }} {...(p.url ? { href: p.url, target: '_blank', rel: 'noreferrer' } : {})}>
        <div className="shot" style={p.image ? undefined : { background: `linear-gradient(135deg,${p.g[0]},${p.g[1]})` }}>
          {p.image ? <img src={p.image} alt={p.title} loading="lazy" /> : <Art kind={p.art} />}
        </div>
        <h3>{p.title}</h3>
        <p className="pt">{p.text}</p><span className="tg">{p.tag}</span>
      </Tag>
    </div>
  )
}

function Projects() {
  const rail = useRef(null)
  const go = (d) => rail.current?.scrollBy({ left: d * 400, behavior: 'smooth' })
  return (
    <section id="projects" style={{ paddingBottom: 60 }}>
      <div className="wrap"><Head eyebrow="Work" title="Recent Projects" sub="A few things I've built and cared about." /></div>
      <div className="rail-wrap">
        <div className="rail" ref={rail} tabIndex={0} aria-label="Projects">
          {projects.map((p) => <Project p={p} key={p.title} />)}
        </div>
      </div>
      <div className="rail-btns">
        <button className="round soft" onClick={() => go(-1)} aria-label="Previous"><Icon name="left" /></button>
        <button className="round" onClick={() => go(1)} aria-label="Next"><Icon name="right" /></button>
      </div>
    </section>
  )
}

function Contact({ toast }) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      toast('Email copied')
    } catch (e) {
      toast(profile.email)
    }
  }
  const socials = profile.social.filter((s) => s.url)
  return (
    <section id="contact" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <R className="cta">
          <h2>Good ideas. Bad ideas. All welcome.</h2>
          <p>Tell me what you're building. I'll tell you honestly how I'd approach it.</p>
          <div className="row">
            <a className="mail" href={`mailto:${profile.email}`}><Icon name="chat" size={18} />{profile.email}</a>
            <button className="copy" onClick={copy}><Icon name="copy" size={16} />Copy email</button>
          </div>
          {socials.length > 0 && (
            <div className="socials">{socials.map((s) => <a key={s.label} href={s.url} target="_blank" rel="noreferrer">{s.label}</a>)}</div>
          )}
          <div className="sig">{profile.name}</div>
        </R>
      </div>
    </section>
  )
}

function Chat({ toast }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="chatb">
      <div className={`pop ${open ? 'open' : ''}`} role="dialog" aria-label="Say hello" aria-hidden={!open}>
        <h4>Say hello 👋</h4>
        <p>The quickest way to reach me is a short email.</p>
        <a className="btn dark" href={`mailto:${profile.email}`} tabIndex={open ? 0 : -1}>Write an email</a>
      </div>
      <button className="fab" onClick={() => setOpen((o) => !o)} aria-label={open ? 'Close chat' : 'Open chat'} aria-expanded={open}>
        <Icon name={open ? 'close' : 'chat'} size={22} />
      </button>
    </div>
  )
}

function Progress() {
  const bar = useRef(null)
  useScrollEffect((y) => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`
  })
  return <div className="prog" aria-hidden="true"><i ref={bar} /></div>
}

export default function App() {
  const [theme, toggleTheme] = useTheme()
  const [loaded, setLoaded] = useState(false)
  const [msg, setMsg] = useState('')
  const [resume, setResume] = useState(false)
  const timer = useRef()
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), prefersReducedMotion() ? 0 : 900)
    return () => clearTimeout(t)
  }, [])
  const toast = (m) => {
    setMsg(m)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setMsg(''), 2200)
  }
  const strip = [...tags, ...tags]
  return (
    <>
      <div className={`pre ${loaded ? 'gone' : ''}`} aria-hidden="true"><span>{profile.name}</span></div>
      <Progress />
      <Nav theme={theme} toggleTheme={toggleTheme} onResume={() => setResume(true)} />
      <main>
        <Hero onResume={() => setResume(true)} />
        <Experience />
        <Academic />
        <Skills />
        <Projects />
        <How />
        <Services />
        <div className="tagstrip marq" aria-hidden="true"><div className="tr">{strip.map((t, i) => <span key={i}>{t}</span>)}</div></div>
        <Contact toast={toast} />
      </main>
      <footer>© {new Date().getFullYear()} {profile.fullName}. Made with care.</footer>
      <Chat toast={toast} />
      <ResumeModal open={resume} onClose={() => setResume(false)} />
      <div className={`toast ${msg ? 'show' : ''}`} role="status">{msg}</div>
    </>
  )
}
