import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <section className="container section" style={{ minHeight: '50vh', display: 'grid', placeItems: 'center' }}>
      <div style={{ maxWidth: 560, textAlign: 'center' }}>
        <p style={{ margin: 0, color: 'var(--hse-muted, #52647A)', fontWeight: 600, letterSpacing: '.04em' }}>404</p>
        <h1 style={{ margin: '8px 0 12px', color: 'var(--hse-blue, #014EB6)', fontFamily: 'Montserrat, Inter, sans-serif', fontSize: 'clamp(1.75rem,4vw,2.5rem)', lineHeight: 1.15 }}>Page not found</h1>
        <p style={{ margin: '0 0 20px', color: 'var(--hse-muted, #52647A)', lineHeight: 1.6 }}>The page you’re looking for doesn’t exist or may have moved.</p>
        <Link to="/" className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-lg font-semibold text-white no-underline" style={{ background: '#014EB6' }}>Back to Home</Link>
      </div>
    </section>
  )
}
