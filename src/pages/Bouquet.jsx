import { Link } from 'react-router-dom'

const NOTES = [
  "you make my heart bloom.",
  "life feels sweeter with you.",
  "you make every moment sweeter.",
  "I choose you every day.",
  "my love for you keeps growing.",
  "my heart will always choose you.",
]

export default function Bouquet() {
  return (
    <div className="page" style={{ display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', minHeight: '90vh', textAlign: 'center' }}>

      <h1 className="h1" style={{ marginBottom: 24 }}>your bouquet 💐</h1>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: 14, maxWidth: 480, width: '100%', marginBottom: 30,
      }}>
        {NOTES.map((n, i) => (
          <div key={i} className="card" style={{
            fontSize: 13.5, fontStyle: 'italic', padding: '16px 14px',
            animation: `fadeUp .5s ease ${i * 0.1}s both`,
          }}>
            {n}
          </div>
        ))}
      </div>

      <div style={{ fontSize: 60, marginBottom: 20 }}>💐</div>

      <Link to="/passed" style={{ color: 'var(--muted)', fontSize: 13 }}>← back to gifts</Link>
    </div>
  )
}
