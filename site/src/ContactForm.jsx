import { useEffect, useRef, useState } from 'react'
import { Icon, POLE_COLORS } from './ui.jsx'

/* Envoi de la demande.
   À brancher avant la mise en ligne : Formspree, Netlify Forms, une API ou un service d'e-mail.
   Exemple Formspree :
     return fetch('https://formspree.io/f/VOTRE_ID', {
       method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
       body: JSON.stringify(payload),
     }).then((r) => { if (!r.ok) throw new Error('envoi') })
*/
async function sendRequest(payload) {
  console.warn('[DAVEM] Formulaire non relié : la demande n’a pas été envoyée.', payload)
  await new Promise((r) => setTimeout(r, 600))
}

const EMPTY = {
  who: 'company', services: [], date: '', duration: '', participants: '', place: '',
  languages: [], message: '', name: '', org: '', email: '', phone: '', pref: 'email', consent: false,
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ContactForm({ t, lang }) {
  const c = t.contact
  const [step, setStep] = useState(0)
  const [d, setD] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent
  const headRef = useRef(null)
  const first = useRef(true)

  useEffect(() => {
    if (first.current) { first.current = false; return }
    headRef.current?.focus()
  }, [step, status])

  const set = (k, v) => { setD((x) => ({ ...x, [k]: v })); setErrors((e) => ({ ...e, [k]: undefined })) }
  const toggle = (k, v) => set(k, d[k].includes(v) ? d[k].filter((x) => x !== v) : [...d[k], v])

  const allServices = t.poles.flatMap((p) => p.services.map((s) => ({ ...s, pole: p.id })))
  const wantsLanguages = d.services.includes('interp')

  const validate = () => {
    const e = {}
    if (step === 0 && d.services.length === 0) e.services = c.errService
    if (step === 2) {
      if (!d.name.trim()) e.name = c.errRequired
      if (!d.email.trim()) e.email = c.errRequired
      else if (!EMAIL_RE.test(d.email.trim())) e.email = c.errEmail
      if (!d.consent) e.consent = c.errConsent
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => { if (validate()) setStep(step + 1) }
  const submit = async (ev) => {
    ev.preventDefault()
    if (step < 2) return next()
    if (!validate()) return
    setStatus('sending')
    try {
      await sendRequest({ ...d, services: d.services.map((id) => allServices.find((s) => s.id === id)?.name) })
      setStatus('sent')
    } catch {
      setStatus('idle')
      setErrors({ form: c.errSend })
    }
  }
  const reset = () => { setD(EMPTY); setStep(0); setStatus('idle'); setErrors({}) }

  /* Récapitulatif */
  const rows = [
    [c.recap.who, c.whoOptions[d.who]],
    [c.recap.services, d.services.map((id) => allServices.find((s) => s.id === id)?.name).join(', ')],
    [c.recap.date, d.date && new Date(d.date + 'T12:00').toLocaleDateString(lang === 'en' ? 'en-GB' : 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })],
    [c.recap.duration, d.duration !== '' && c.durationOptions[d.duration]],
    [c.recap.participants, d.participants !== '' && c.participantsOptions[d.participants]],
    [c.recap.place, d.place],
    [c.recap.languages, wantsLanguages && d.languages.map((i) => c.langOptions[i]).join(', ')],
  ].filter(([, v]) => v)

  const err = (k) => errors[k] && <span className="err" id={`${k}-err`}>{errors[k]}</span>

  return (
    <section className="section section-contact" id="contact">
      <div className="wrap contact-grid">
        <div className="contact-intro">
          <p className="eyebrow light">{c.eyebrow}</p>
          <h2>{c.title}</h2>
          <p className="lead">{c.lead}</p>
        </div>

        <aside className="contact-side">
          <div className="recap" aria-live="polite">
            <h3>{c.recap.title}</h3>
            {rows.length === 0 ? <p className="recap-empty">{c.recap.empty}</p> : (
              <dl>{rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
            )}
          </div>
          <div className="quick">
            <Icon name="phone" className="quick-icon" />
            <div>
              <p>{c.quick}</p>
              <p className="quick-num">{c.coords.phoneValue}</p>
              <p className="quick-mail">{c.coords.emailValue} · {c.coords.addressValue}</p>
            </div>
          </div>
        </aside>

        <div className="form-box">
          {status === 'sent' ? (
            <div className="sent" role="status">
              <span className="sent-check"><Icon name="check" className="tool-icon" /></span>
              <h3 tabIndex={-1} ref={headRef}>{c.sent.title}</h3>
              <p>{c.sent.text}</p>
              <button type="button" className="btn btn-ghost" onClick={reset}>{c.sent.again}</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <ol className="stepper">
                {c.steps.map((s, i) => (
                  <li key={s} className={i === step ? 'current' : i < step ? 'done' : ''} aria-current={i === step ? 'step' : undefined}>
                    <span className="dot">{i < step ? <Icon name="check" className="dot-icon" /> : i + 1}</span>
                    <span className="step-label">{s}</span>
                  </li>
                ))}
              </ol>
              <p className="step-of">{c.stepOf(step + 1, 3)}</p>
              <h3 className="step-title" tabIndex={-1} ref={headRef}>{c.steps[step]}</h3>

              {step === 0 && (
                <div className="fields">
                  <fieldset>
                    <legend>{c.who}</legend>
                    <div className="segmented">
                      {Object.entries(c.whoOptions).map(([k, label]) => (
                        <label key={k} className={d.who === k ? 'on' : ''}>
                          <input type="radio" name="who" id={`who-${k}`} value={k} checked={d.who === k} onChange={() => set('who', k)} />
                          {label}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <fieldset aria-describedby={errors.services ? 'services-err' : undefined}>
                    <legend>{c.services} <small>{c.servicesHint}</small></legend>
                    <div className="service-pick">
                      {allServices.map((s) => {
                        const on = d.services.includes(s.id)
                        return (
                          <label key={s.id} className={on ? 'pick on' : 'pick'} style={{ '--c': POLE_COLORS[s.pole] }}>
                            <input type="checkbox" id={`svc-${s.id}`} checked={on} onChange={() => toggle('services', s.id)} />
                            <Icon name={s.icon} className="pick-icon" />
                            <span>{s.name}</span>
                            <span className="pick-check"><Icon name="check" className="dot-icon" /></span>
                          </label>
                        )
                      })}
                    </div>
                    {err('services')}
                  </fieldset>
                </div>
              )}

              {step === 1 && (
                <div className="fields">
                  <div className="row">
                    <label className="field"><span className="field-label">{c.date}</span><input type="date" id="date" value={d.date} onChange={(e) => set('date', e.target.value)} /></label>
                    <label className="field"><span className="field-label">{c.duration}</span>
                      <select id="duration" value={d.duration} onChange={(e) => set('duration', e.target.value)}>
                        <option value="">—</option>
                        {c.durationOptions.map((o, i) => <option key={o} value={i}>{o}</option>)}
                      </select>
                    </label>
                  </div>
                  <fieldset>
                    <legend>{c.participants}</legend>
                    <div className="chips">
                      {c.participantsOptions.map((o, i) => (
                        <label key={o} className={String(d.participants) === String(i) ? 'chip on' : 'chip'}>
                          <input type="radio" name="participants" id={`part-${i}`} checked={String(d.participants) === String(i)} onChange={() => set('participants', i)} />
                          {o}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <label className="field"><span className="field-label">{c.place}</span><input id="place" value={d.place} placeholder={c.placePh} onChange={(e) => set('place', e.target.value)} /></label>
                  {wantsLanguages && (
                    <fieldset>
                      <legend>{c.languages} <small>{c.languagesHint}</small></legend>
                      <div className="chips">
                        {c.langOptions.map((o, i) => (
                          <label key={o} className={d.languages.includes(i) ? 'chip on' : 'chip'}>
                            <input type="checkbox" id={`lang-${i}`} checked={d.languages.includes(i)} onChange={() => toggle('languages', i)} />
                            {o}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  )}
                  <label className="field"><span className="field-label">{c.message} <small>({c.optional})</small></span>
                    <textarea id="message" rows="3" value={d.message} placeholder={c.messagePh} onChange={(e) => set('message', e.target.value)} />
                  </label>
                </div>
              )}

              {step === 2 && (
                <div className="fields">
                  <div className="row">
                    <label className="field"><span className="field-label">{c.name}</span>
                      <input id="name" autoComplete="name" value={d.name} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-err' : undefined} onChange={(e) => set('name', e.target.value)} />
                      {err('name')}
                    </label>
                    {d.who !== 'private' && (
                      <label className="field"><span className="field-label">{c.org} <small>({c.optional})</small></span>
                        <input id="org" autoComplete="organization" value={d.org} onChange={(e) => set('org', e.target.value)} />
                      </label>
                    )}
                  </div>
                  <div className="row">
                    <label className="field"><span className="field-label">{c.email}</span>
                      <input id="email" type="email" autoComplete="email" value={d.email} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-err' : undefined} onChange={(e) => set('email', e.target.value)} />
                      {err('email')}
                    </label>
                    <label className="field"><span className="field-label">{c.phone} <small>({c.optional})</small></span>
                      <input id="phone" type="tel" autoComplete="tel" value={d.phone} onChange={(e) => set('phone', e.target.value)} />
                    </label>
                  </div>
                  <fieldset>
                    <legend>{c.pref}</legend>
                    <div className="segmented">
                      {Object.entries(c.prefOptions).map(([k, label]) => (
                        <label key={k} className={d.pref === k ? 'on' : ''}>
                          <input type="radio" name="pref" id={`pref-${k}`} value={k} checked={d.pref === k} onChange={() => set('pref', k)} />
                          {label}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <label className="consent">
                    <input type="checkbox" id="consent" checked={d.consent} aria-invalid={!!errors.consent} onChange={(e) => set('consent', e.target.checked)} />
                    <span>{c.consentBefore}<a href="#/confidentialite" target="_blank" rel="noopener">{c.consentLink}</a>.</span>
                  </label>
                  {err('consent')}
                  {err('form')}
                </div>
              )}

              <div className="form-nav">
                {step > 0 && <button type="button" className="btn btn-ghost" onClick={() => setStep(step - 1)}>{c.back}</button>}
                <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                  {step < 2 ? c.next : status === 'sending' ? c.sending : c.send}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
