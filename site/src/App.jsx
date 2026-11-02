import { useEffect, useState } from 'react'
import { T } from './i18n.js'
import { Mark, Icon, Logo, POLE_COLORS } from './ui.jsx'
import ContactForm from './ContactForm.jsx'
import Legal from './Legal.jsx'

/* ---------- Préférences (langue, thème) ---------- */

function read(key) {
  try { return localStorage.getItem(key) } catch { return null }
}
function write(key, value) {
  try { localStorage.setItem(key, value) } catch { /* stockage indisponible */ }
}
function initialLang() {
  const saved = read('davem-lang')
  if (saved === 'fr' || saved === 'en') return saved
  return (navigator.language || 'fr').toLowerCase().startsWith('en') ? 'en' : 'fr'
}

/* Routes : #/confidentialite et #/conditions ; tout le reste = accueil */
function readRoute() {
  const h = window.location.hash
  if (h === '#/confidentialite' || h === '#/privacy') return 'privacy'
  if (h === '#/conditions' || h === '#/terms') return 'terms'
  return 'home'
}

/* ---------- En-tête ---------- */

function Header({ t, lang, setLang, theme, setTheme }) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  const dark = theme === 'dark'
  return (
    <header className="header">
      <div className="wrap header-row">
        <a href="#top" className="brand" onClick={close}>
          <Logo tagline={t.tagline} className="brand-logo" />
        </a>
        <nav id="nav" className={open ? 'nav open' : 'nav'} aria-label="Navigation principale">
          <a href="#services" onClick={close}>{t.nav.services}</a>
          <a href="#approche" onClick={close}>{t.nav.approach}</a>
          <a href="#pourquoi" onClick={close}>{t.nav.why}</a>
          <a href="#contact" className="btn btn-primary" onClick={close}>{t.nav.quote}</a>
        </nav>
        <div className="tools">
          <button className="tool" onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')} aria-label={t.ui.switchLang} title={t.ui.switchLang}>
            {t.ui.langShort}
          </button>
          <button className="tool" onClick={() => setTheme(dark ? 'light' : 'dark')} aria-label={dark ? t.ui.toLight : t.ui.toDark} title={dark ? t.ui.toLight : t.ui.toDark}>
            <Icon name={dark ? 'sun' : 'moon'} className="tool-icon" />
          </button>
          <button className={open ? 'tool menu-btn open' : 'tool menu-btn'} aria-expanded={open} aria-controls="nav"
            aria-label={open ? t.nav.close : t.nav.menu} onClick={() => setOpen(!open)}>
            <span className="burger" aria-hidden="true"><i /><i /><i /></span>
          </button>
        </div>
      </div>
    </header>
  )
}

/* ---------- Accueil ---------- */

function Home({ t, lang }) {
  return (
    <>
      <section className="hero" id="top">
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow">{t.hero.eyebrow}</p>
            <h1>{t.hero.title}</h1>
            <p className="lead">{t.hero.lead}</p>
            <div className="actions">
              <a href="#contact" className="btn btn-primary">{t.hero.cta1}</a>
              <a href="#services" className="btn btn-ghost">{t.hero.cta2}</a>
            </div>
          </div>
          <div className="hero-art"><Mark className="hero-mark" /></div>
        </div>
        <div className="wrap poles">
          {t.poles.map((p) => (
            <a key={p.id} href={`#${p.id}`} className="pole" style={{ '--c': POLE_COLORS[p.id] }}>
              <span className="tri" />
              <span><b>{p.title}</b><small>{p.intro}</small></span>
            </a>
          ))}
        </div>
      </section>

      <section className="section" id="services">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">{t.services.eyebrow}</p>
            <h2>{t.services.title}</h2>
            <p className="lead">{t.services.lead}</p>
          </div>
          <div className="pole-list">
            {t.poles.map((p) => (
              <div key={p.id} id={p.id} className="pole-block" style={{ '--c': POLE_COLORS[p.id] }}>
                <div className="pole-title"><span className="tri" /><h3>{p.title}</h3></div>
                <div className="cards">
                  {p.services.map((s) => (
                    <article key={s.id} className="card">
                      <Icon name={s.icon} />
                      <h4>{s.name}</h4>
                      <p>{s.text}</p>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" id="approche">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">{t.approach.eyebrow}</p>
            <h2>{t.approach.title}</h2>
          </div>
          <ol className="steps">
            {t.approach.steps.map((s, i) => (
              <li key={s.name}>
                <span className="step-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.name}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" id="pourquoi">
        <div className="wrap why-grid">
          <div>
            <p className="eyebrow">{t.why.whoEyebrow}</p>
            <h2>{t.why.whoTitle}</h2>
            <div className="clients">
              {t.why.clients.map((c) => <div key={c.name}><h3>{c.name}</h3><p>{c.text}</p></div>)}
            </div>
          </div>
          <div className="promise">
            <Mark className="promise-mark" mono="rgba(255,255,255,.12)" />
            <p className="eyebrow light">{t.why.whyEyebrow}</p>
            <ul>
              {t.why.promises.map((p) => <li key={p.name}><b>{p.name}</b><span>{p.text}</span></li>)}
            </ul>
          </div>
        </div>
      </section>

      <ContactForm t={t} lang={lang} />
    </>
  )
}

/* ---------- Pied de page ---------- */

function Footer({ t }) {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Logo tagline={t.tagline} className="footer-logo" mono />
          <p className="footer-slogan">{t.slogan}</p>
        </div>
        <nav aria-label={t.nav.services}>
          <a href="#services">{t.nav.services}</a>
          <a href="#approche">{t.nav.approach}</a>
          <a href="#pourquoi">{t.nav.why}</a>
          <a href="#contact">{t.nav.contact}</a>
        </nav>
        <nav aria-label={t.footer.legal}>
          <a href={`${import.meta.env.BASE_URL}charte/index.html`} target="_blank" rel="noopener">{t.footer.charter} ↗</a>
          <a href="#/confidentialite">{t.footer.privacy}</a>
          <a href="#/conditions">{t.footer.terms}</a>
        </nav>
      </div>
      <div className="wrap footer-bottom">© {new Date().getFullYear()} DAVEM. {t.footer.rights}</div>
    </footer>
  )
}

/* ---------- Retour en haut ---------- */

function ToTop({ label }) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <button
      className={show ? 'to-top show' : 'to-top'}
      onClick={() => window.scrollTo({ top: 0 })}
      aria-label={label}
      title={label}
      tabIndex={show ? 0 : -1}
    >
      <Icon name="up" className="tool-icon" />
    </button>
  )
}

/* ---------- Application ---------- */

export default function App() {
  const [lang, setLangState] = useState(initialLang)
  const [theme, setThemeState] = useState(() => document.documentElement.dataset.theme || 'light')
  const [route, setRoute] = useState(readRoute)
  const t = T[lang]

  const setLang = (l) => { setLangState(l); write('davem-lang', l) }
  const setTheme = (th) => { setThemeState(th); write('davem-theme', th) }

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = route === 'home' ? t.meta.title : `${t.legal[route].title} — DAVEM`
  }, [lang, route, t])

  useEffect(() => { document.documentElement.dataset.theme = theme }, [theme])

  // Navigation : changement de page ou défilement vers une section
  useEffect(() => {
    const onHash = () => {
      const next = readRoute()
      setRoute(next)
      if (next !== 'home') { window.scrollTo({ top: 0 }); return }
      const id = window.location.hash.slice(1)
      requestAnimationFrame(() => {
        const el = id && document.getElementById(id)
        if (el) el.scrollIntoView()
        else if (id === 'top') window.scrollTo({ top: 0 })
      })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <>
      <Header t={t} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />
      <main>
        {route === 'home' ? <Home t={t} lang={lang} /> : <Legal t={t} page={route} />}
      </main>
      <Footer t={t} />
      <ToTop label={t.ui.toTop} />
    </>
  )
}
