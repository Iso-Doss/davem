/* Pages Politique de confidentialité et Conditions d'utilisation */

export default function Legal({ t, page }) {
  const doc = t.legal[page]
  const other = page === 'privacy' ? 'terms' : 'privacy'
  const href = (p) => (p === 'privacy' ? '#/confidentialite' : '#/conditions')
  return (
    <article className="legal">
      <div className="wrap legal-grid">
        <aside className="legal-side">
          <a href="#top" className="back">← {t.legal.back}</a>
          <nav aria-label={t.footer.legal}>
            <a href={href('privacy')} aria-current={page === 'privacy' ? 'page' : undefined}>{t.footer.privacy}</a>
            <a href={href('terms')} aria-current={page === 'terms' ? 'page' : undefined}>{t.footer.terms}</a>
          </nav>
        </aside>
        <div className="legal-body">
          <p className="eyebrow">{t.legal.updated}</p>
          <h1>{doc.title}</h1>
          <p className="lead">{doc.intro}</p>
          {doc.sections.map((s, i) => (
            <section key={s.h}>
              <h2><span>{String(i + 1).padStart(2, '0')}</span>{s.h}</h2>
              {s.p && s.p.map((p) => <p key={p}>{p}</p>)}
              {s.list && <ul>{s.list.map((li) => <li key={li}>{li}</li>)}</ul>}
              {s.after && s.after.map((p) => <p key={p}>{p}</p>)}
              {s.link && <p><a href={href(s.link)}>{t.footer[s.link]} →</a></p>}
            </section>
          ))}
          <p className="legal-next"><a href={href(other)}>{t.footer[other]} →</a></p>
        </div>
      </div>
    </article>
  )
}
