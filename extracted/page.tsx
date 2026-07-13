// Marketing landing page — Evercrafted SaaS
// Design: editorial luxury, deep forest green on warm parchment, Cormorant display
// Signature element: full-viewport hero with botanical SVG wreath arc + kinetic tagline

import Link from 'next/link'

const TIERS = [
  {
    name: 'Bloom',
    price: '$39',
    per: '/month',
    description: 'The design intelligence engine. Turn a brief into a full collection.',
    features: ['Unlimited collection generation', 'Full 8-product hierarchy', 'Palette intelligence', 'Release strategy', 'Cross-sell architecture'],
    cta: 'Start with Bloom',
    accent: '#6B8F67',
  },
  {
    name: 'Craft',
    price: '$97',
    per: '/month',
    description: 'The complete production pipeline. From brief to ready-to-render.',
    features: ['Everything in Bloom', 'Render Guide (all 8 products)', 'Prompt Kit (14 templates)', 'AI Render Review', 'Notes & Seeds vault'],
    cta: 'Start with Craft',
    accent: '#4A6741',
    featured: true,
  },
  {
    name: 'Studio',
    price: '$197',
    per: '/month',
    description: 'The commerce layer. Brief to blueprint to Etsy listing.',
    features: ['Everything in Craft', 'Inventory integration', 'Etsy listing generator', 'Moodoor story drops', 'Client handoff pages'],
    cta: 'Start with Studio',
    accent: '#C4963A',
  },
  {
    name: 'Atelier',
    price: '$397',
    per: '/month',
    description: 'The full platform. White-label, API access, cross-collection continuity.',
    features: ['Everything in Studio', 'Cross-season collection continuity', 'White-label output', 'API access', 'Direct strategic support'],
    cta: 'Apply for Atelier',
    accent: '#1A1A1A',
  },
]

const FEATURES = [
  {
    title: 'Collection Intelligence',
    body: 'Describe a season, mood, or emotional direction. The engine generates a complete 8-product collection — palette, hierarchy, release phases, cross-sell systems, and your hero MJ V7 render prompt.',
    icon: '◦',
  },
  {
    title: 'Product Render Guide',
    body: 'Phase-by-phase rendering workflow for every product in the collection. Each phase shows exactly what goes in the Image Prompt, Omni Reference, and Style Reference slots. Copy and paste.',
    icon: '→',
  },
  {
    title: 'AI Render Review',
    body: 'Upload any render and get an immediate critique against Evercrafted standards. Ring completeness, faux quality, focal hierarchy, silence arc, density — specific fixes, ready to copy into your next prompt.',
    icon: '✓',
  },
  {
    title: 'Prompt Kit',
    body: '14 ready-to-paste prompt templates for common additions and fixes. Off-center bows, twig extensions, extra greens, pinecones, ornaments, and problem-solvers for cotton bolls, blue pine, and painted looks.',
    icon: '⌖',
  },
]

export default function LandingPage() {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#F9F7F4', color: '#1A1A1A' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Dancing+Script:wght@600&family=DM+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .script { font-family: 'Dancing Script', cursive; }
        .mono { font-family: 'DM Mono', monospace; }
        a { color: inherit; text-decoration: none; }
      `}</style>

      {/* NAV */}
      <nav style={{ padding: '16px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #E8E8E8', background: '#F9F7F4', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="20" height="20" viewBox="0 0 32 32" fill="none" style={{ color: '#4A6741' }}>
            <path d="M16 28C16 28 8 20 8 12C8 7.6 11.6 4 16 4C20.4 4 24 7.6 24 12C24 20 16 28 16 28Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M16 18C16 18 12 16 10 13M16 14C16 14 20 12 22 9" stroke="currentColor" strokeWidth="1" fill="none"/>
          </svg>
          <span className="script" style={{ fontSize: 22, color: '#1A1A1A' }}>Evercrafted</span>
        </div>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <a href="#features" className="mono" style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4A4A4A' }}>Features</a>
          <a href="#pricing" className="mono" style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4A4A4A' }}>Pricing</a>
          <Link href="/login" style={{ fontSize: 13, color: '#4A4A4A' }}>Sign in</Link>
          <Link href="/signup" style={{ padding: '8px 20px', background: '#1A1A1A', color: '#F9F7F4', borderRadius: 6, fontSize: 13, fontWeight: 500 }}>Start free</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: '92vh', display: 'flex', alignItems: 'center', padding: '80px 48px', position: 'relative', overflow: 'hidden' }}>
        {/* Background botanical SVG */}
        <svg style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', opacity: 0.06, width: '55%', height: 'auto' }} viewBox="0 0 600 600" fill="none">
          <circle cx="300" cy="300" r="240" stroke="#4A6741" strokeWidth="1"/>
          <circle cx="300" cy="300" r="160" stroke="#4A6741" strokeWidth="0.8"/>
          {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => (
            <g key={i} transform={`rotate(${deg} 300 300)`}>
              <path d={`M300 60 C300 60 290 90 300 120 C310 90 300 60 300 60`} stroke="#4A6741" strokeWidth="0.8" fill="none"/>
            </g>
          ))}
        </svg>

        <div style={{ maxWidth: 720, position: 'relative' }}>
          <p className="mono" style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4A6741', marginBottom: 20 }}>◦ Collection Intelligence Studio</p>
          <h1 className="serif" style={{ fontSize: 'clamp(52px, 7vw, 88px)', fontWeight: 500, lineHeight: 1.0, letterSpacing: '-0.02em', color: '#1A1A1A', marginBottom: 24 }}>
            Turn a feeling<br />
            <em style={{ color: '#4A6741', fontStyle: 'italic' }}>into a full collection.</em>
          </h1>
          <p style={{ fontSize: 18, color: '#4A4A4A', lineHeight: 1.7, maxWidth: 560, marginBottom: 40 }}>
            The AI-powered design, render, and commerce system for premium faux botanical wreath makers. 
            One brief. Eight products. Production-ready render prompts. Etsy listings.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/signup" style={{ padding: '14px 32px', background: '#1A1A1A', color: '#F9F7F4', borderRadius: 6, fontSize: 15, fontWeight: 500 }}>
              Start for free
            </Link>
            <a href="#features" style={{ padding: '14px 28px', border: '1px solid #D0D0D0', borderRadius: 6, fontSize: 15, color: '#4A4A4A' }}>
              See how it works
            </a>
          </div>
          <p className="mono" style={{ fontSize: 10, color: '#A8A8A8', letterSpacing: '0.1em', marginTop: 16 }}>
            2 free collections · No credit card required
          </p>
        </div>
      </section>

      {/* DIVIDER */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '0 48px', marginBottom: 80 }}>
        <div style={{ flex: 1, height: 1, background: '#E8E8E8' }}/>
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" style={{ color: '#4A6741', flexShrink: 0 }}>
          <path d="M16 28C16 28 8 20 8 12C8 7.6 11.6 4 16 4C20.4 4 24 7.6 24 12C24 20 16 28 16 28Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        </svg>
        <div style={{ flex: 1, height: 1, background: '#E8E8E8' }}/>
      </div>

      {/* FEATURES */}
      <section id="features" style={{ padding: '0 48px 100px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4A6741', marginBottom: 12 }}>What it does</p>
          <h2 className="serif" style={{ fontSize: 48, fontWeight: 500, letterSpacing: '-0.01em', marginBottom: 60 }}>
            The full pipeline,<br />in one place.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {FEATURES.map((f, i) => (
              <div key={i} style={{ background: '#FFFFFF', border: '1px solid #E8E8E8', borderRadius: 8, padding: '28px 28px 32px' }}>
                <div className="mono" style={{ fontSize: 18, color: '#4A6741', marginBottom: 14 }}>{f.icon}</div>
                <h3 className="serif" style={{ fontSize: 22, fontWeight: 600, marginBottom: 10 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: '#4A4A4A', lineHeight: 1.7 }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: '#F2EFE9', padding: '80px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4A6741', marginBottom: 12 }}>How it works</p>
          <h2 className="serif" style={{ fontSize: 48, fontWeight: 500, letterSpacing: '-0.01em', marginBottom: 60 }}>
            Brief to collection<br />in three steps.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
            {[
              { step: '—', title: 'Write a brief', body: 'Describe a season, mood, or emotional direction. As specific or abstract as you like. "Late autumn, the last warmth before winter. Rust and aged brass." That\'s enough.' },
              { step: '—', title: 'Generate the collection', body: 'The engine produces a complete 8-product system — palette, product hierarchy with pricing, release strategy, cross-sell architecture, bundles, and your hero render prompt.' },
              { step: '—', title: 'Render and list', body: 'The Render Guide walks you through every phase for every product. Upload renders for AI review. Export Etsy listings. The whole pipeline runs from the same brief.' },
            ].map((s, i) => (
              <div key={i}>
                <p className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', color: '#4A6741', marginBottom: 16 }}>{s.step}</p>
                <h3 className="serif" style={{ fontSize: 24, fontWeight: 600, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: '#4A4A4A', lineHeight: 1.7 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: '80px 48px 100px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4A6741', marginBottom: 12 }}>Pricing</p>
          <h2 className="serif" style={{ fontSize: 48, fontWeight: 500, letterSpacing: '-0.01em', marginBottom: 60 }}>
            Build your pipeline<br />at your pace.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {TIERS.map((t, i) => (
              <div key={i} style={{
                background: t.featured ? '#1A1A1A' : '#FFFFFF',
                border: `1px solid ${t.featured ? '#1A1A1A' : '#E8E8E8'}`,
                borderRadius: 8, padding: '32px 28px',
                color: t.featured ? '#F9F7F4' : '#1A1A1A',
              }}>
                <p className="mono" style={{ fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: t.accent, marginBottom: 8 }}>{t.name}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 8 }}>
                  <span className="serif" style={{ fontSize: 40, fontWeight: 500 }}>{t.price}</span>
                  <span style={{ fontSize: 13, color: t.featured ? '#A8A8A8' : '#787878' }}>{t.per}</span>
                </div>
                <p style={{ fontSize: 13, color: t.featured ? '#D0D0D0' : '#4A4A4A', lineHeight: 1.6, marginBottom: 24, minHeight: 52 }}>{t.description}</p>
                <ul style={{ listStyle: 'none', marginBottom: 28 }}>
                  {t.features.map((f, fi) => (
                    <li key={fi} style={{ fontSize: 13, color: t.featured ? '#D0D0D0' : '#4A4A4A', padding: '5px 0', borderBottom: `1px solid ${t.featured ? '#2E2E2E' : '#F2F2F2'}`, display: 'flex', gap: 8 }}>
                      <span style={{ color: t.accent, flexShrink: 0 }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <Link href="/signup" style={{
                  display: 'block', textAlign: 'center', padding: '11px 20px',
                  background: t.featured ? '#F9F7F4' : '#1A1A1A',
                  color: t.featured ? '#1A1A1A' : '#F9F7F4',
                  borderRadius: 6, fontSize: 13, fontWeight: 500,
                }}>
                  {t.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section style={{ background: '#1A1A1A', padding: '80px 48px', textAlign: 'center' }}>
        <svg width="36" height="36" viewBox="0 0 32 32" fill="none" style={{ color: '#4A6741', margin: '0 auto 20px' }}>
          <path d="M16 28C16 28 8 20 8 12C8 7.6 11.6 4 16 4C20.4 4 24 7.6 24 12C24 20 16 28 16 28Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <path d="M16 18C16 18 12 16 10 13M16 14C16 14 20 12 22 9" stroke="currentColor" strokeWidth="1" fill="none"/>
        </svg>
        <h2 className="serif" style={{ fontSize: 52, fontWeight: 500, color: '#F9F7F4', marginBottom: 16 }}>
          Ready to build your first collection?
        </h2>
        <p style={{ fontSize: 16, color: '#787878', marginBottom: 36, maxWidth: 480, margin: '0 auto 36px' }}>
          Start with 2 free collections. No credit card required.
          The brief to blueprint to render pipeline starts here.
        </p>
        <Link href="/signup" style={{ display: 'inline-block', padding: '16px 40px', background: '#4A6741', color: '#F9F7F4', borderRadius: 6, fontSize: 15, fontWeight: 500 }}>
          Start building — it&apos;s free
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ padding: '24px 48px', borderTop: '1px solid #2E2E2E', background: '#1A1A1A', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="script" style={{ color: '#F9F7F4', fontSize: 18 }}>Evercrafted</span>
        <p className="mono" style={{ fontSize: 9, color: '#4A4A4A', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Collection Intelligence Studio
        </p>
      </footer>
    </div>
  )
}
