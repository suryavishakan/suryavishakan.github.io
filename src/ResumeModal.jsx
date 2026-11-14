import { useEffect, useRef } from 'react'
import Icon from './icons'
import { profile } from './content'

export default function ResumeModal({ open, onClose }) {
  const closeBtn = useRef(null)
  useEffect(() => {
    if (!open) return
    const prev = document.activeElement
    document.body.style.overflow = 'hidden'
    closeBtn.current?.focus()
    const key = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', key)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', key)
      prev?.focus?.()
    }
  }, [open, onClose])
  return (
    <div className={`rm ${open ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="Resume" aria-hidden={!open} onClick={onClose}>
      <div className="rm-box" onClick={(e) => e.stopPropagation()}>
        <div className="rm-bar">
          <b>Resume</b>
          <div>
            <a className="btn dark" href={profile.resumePdf} download="Surya_Vishakan_Resume.pdf" tabIndex={open ? 0 : -1}>Download PDF</a>
            <button className="round soft" ref={closeBtn} onClick={onClose} aria-label="Close resume"><Icon name="close" /></button>
          </div>
        </div>
        <div className="rm-body">
          {profile.resumePages.map((src, i) => <img key={i} src={src} alt={`Resume page ${i + 1}`} />)}
        </div>
      </div>
    </div>
  )
}
