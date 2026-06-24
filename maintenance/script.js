// ─────────────────────────────────────────────────────────────────────────────
// TDARAB — Maintenance / Coming Soon page script
// To switch modes, change data-mode on <body>:
//   data-mode="coming-soon"  → platform under development
//   data-mode="maintenance"  → scheduled or unplanned downtime
// ─────────────────────────────────────────────────────────────────────────────

const CONTENT = {
  'coming-soon': {
    badge:    'Coming Soon',
    title:    "We're Building Something Great",
    subtitle: `The TDARAB medical education platform is currently under development.<br>
               We're working hard to bring you a world-class learning experience.`,
    features: [
      'Smart question banks tailored for medical students',
      'Adaptive learning with real-time performance tracking',
      'Curated content reviewed by medical professionals',
    ],
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="1.5"
             stroke-linecap="round" stroke-linejoin="round">
             <path d="M12 2L2 7l10 5 10-5-10-5z"/>
             <path d="M2 17l10 5 10-5"/>
             <path d="M2 12l10 5 10-5"/>
           </svg>`,
  },
  'maintenance': {
    badge:    'Under Maintenance',
    title:    "We'll Be Right Back",
    subtitle: `The platform is currently undergoing scheduled maintenance.<br>
               We expect to be back shortly. Thank you for your patience.`,
    features: [
      'Maintenance is expected to take a short time',
      'Your data and progress are safe',
      'No action required — just check back soon',
    ],
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="1.5"
             stroke-linecap="round" stroke-linejoin="round">
             <circle cx="12" cy="12" r="3"/>
             <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
             <path d="M4.93 4.93a10 10 0 0 0 0 14.14"/>
             <path d="M12 2v2m0 16v2M2 12h2m16 0h2"/>
           </svg>`,
  },
}

document.addEventListener('DOMContentLoaded', () => {
  const mode    = document.body.dataset.mode || 'coming-soon'
  const content = CONTENT[mode] || CONTENT['coming-soon']

  document.getElementById('headerBadge').textContent  = content.badge
  document.getElementById('title').textContent        = content.title
  document.getElementById('subtitle').innerHTML       = content.subtitle
  document.getElementById('iconWrap').innerHTML       = content.icon
  document.getElementById('year').textContent         = new Date().getFullYear()

  const featuresEl = document.querySelector('.features')
  featuresEl.innerHTML = content.features
    .map(f => `<div class="feature"><span class="feature-dot"></span>${f}</div>`)
    .join('')
})
