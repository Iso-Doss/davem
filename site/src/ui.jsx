/* Éléments graphiques partagés : symbole DAVEM et pictogrammes */

export function Mark({ className, mono }) {
  return (
    <svg className={className} viewBox="0 0 200 173.21" aria-hidden="true">
      <polygon points="82.10,31.00 0.00,173.21 30.02,173.21 97.11,57.00" fill={mono || 'var(--mark-gold)'} />
      <polygon points="35.80,173.21 200.00,173.21 184.99,147.21 50.81,147.21" fill={mono || 'var(--mark-blue)'} />
      <polygon points="182.10,142.21 100.00,0.00 84.99,26.00 152.08,142.21" fill={mono || 'var(--mark-red)'} />
    </svg>
  )
}

/* Logo horizontal avec signature (« Communication · Événements · Logistique »).
   Couleurs pilotées par le thème ; mono="white" pour la version blanche. */
export function Logo({ tagline, className, mono }) {
  const word = mono ? '#FFFFFF' : 'var(--logo-word)'
  const tag = mono ? 'rgba(255,255,255,.72)' : 'var(--logo-tag)'
  return (
    <svg className={className} viewBox="0 0 624.06 140" role="img" aria-label="DAVEM">
      <g transform="scale(0.80829)">
        <polygon points="82.10,31.00 0.00,173.21 30.02,173.21 97.11,57.00" fill={mono ? '#FFFFFF' : 'var(--mark-gold)'} />
        <polygon points="35.80,173.21 200.00,173.21 184.99,147.21 50.81,147.21" fill={mono ? '#FFFFFF' : 'var(--mark-blue)'} />
        <polygon points="182.10,142.21 100.00,0.00 84.99,26.00 152.08,142.21" fill={mono ? '#FFFFFF' : 'var(--mark-red)'} />
      </g>
      <g transform="translate(201.66 20) scale(.88)" fill={word}>
        <path fillRule="evenodd" d="M0 0H40A50 50 0 0 1 40 100H0Z M22 20V80H40A30 30 0 0 0 40 20Z" />
        <path transform="translate(87 0)" d="M0 100L37 0H61L98 100H75L49 28L23 100Z" />
        <path transform="translate(164 0)" d="M0 0H23L49 72L75 0H98L61 100H37Z" />
        <path transform="translate(274 0)" d="M0 0H80V20H22V40H72V60H22V80H80V100H0Z" />
        <path transform="translate(370 0)" d="M0 100V0H24L55 54L86 0H110V100H88V40L63 84H47L22 40V100Z" />
      </g>
      <text x="201.66" y="140" fontFamily="Archivo, Arial, Helvetica, sans-serif" fontWeight="600" fontSize="17"
        textLength="422.4" lengthAdjust="spacingAndGlyphs" fill={tag}>
        {tagline.toUpperCase()}
      </text>
    </svg>
  )
}

const ICONS = {
  megaphone: <><path d="M3 10v4h3l7 4V6l-7 4H3z" /><path d="M16.5 9.5a3.5 3.5 0 0 1 0 5" /><path d="M19 7a7 7 0 0 1 0 10" /></>,
  bubbles: <><path d="M3 4h11v8H8l-3 3v-3H3z" /><path d="M14 9h7v8h-2v3l-3-3h-5v-2" /><path d="M6 8h5" /></>,
  calendar: <><rect x="3.5" y="5" width="17" height="15" rx="1.5" /><path d="M3.5 10h17M8 3v4M16 3v4" /><path d="M9 15l2 2 4-4" /></>,
  star: <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z" />,
  box: <><path d="M3 7.5l9-4.5 9 4.5v9L12 21l-9-4.5z" /><path d="M3 7.5l9 4.5 9-4.5M12 12v9" /></>,
  van: <><path d="M2.5 6.5h12v10h-12z" /><path d="M14.5 10h4l3 3.5v3h-7" /><circle cx="6.5" cy="17.5" r="1.8" /><circle cx="17.5" cy="17.5" r="1.8" /></>,
  bed: <><path d="M3 5v14M3 15h18v4M21 15v-2.5A3.5 3.5 0 0 0 17.5 9H11v6" /><circle cx="7" cy="11.5" r="2" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" /></>,
  moon: <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />,
  up: <path d="M12 19V5M5.5 11.5L12 5l6.5 6.5" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  phone: <path d="M5 3.5h4l1.5 4-2.5 1.5a11 11 0 0 0 6 6l1.5-2.5 4 1.5v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5.5a2 2 0 0 1 2-2z" />,
}

export function Icon({ name, className = 'icon' }) {
  return <svg className={className} viewBox="0 0 24 24" aria-hidden="true">{ICONS[name]}</svg>
}

export const POLE_COLORS = {
  communication: 'var(--blue-ui)',
  evenements: 'var(--gold)',
  logistique: 'var(--red-ui)',
}
