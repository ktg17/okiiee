import { Link } from 'react-router-dom'

export default function Letter() {
  return (
    <div className="page" style={{ display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', minHeight: '90vh', textAlign: 'center' }}>

      <h1 className="h1" style={{ marginBottom: 22 }}>a letter from my heart 💌</h1>

      <div className="card" style={{ maxWidth: 480, textAlign: 'left', fontSize: 15,
        lineHeight: 1.85 }}>
        You make my life feel more beautiful and meaningful, and I feel so lucky to have you.
        <br /><br />
        You make me smile, you make me feel safe, and you bring so much happiness into my world.
        <br /><br />
        Thank you for being you and for filling my heart with so much love.
        <br /><br />
        <span style={{ color: 'var(--accent)', fontWeight: 700 }}>always, forever. 💗</span>
      </div>

      <div style={{ marginTop: 24 }}>
        <Link to="/passed" style={{ color: 'var(--muted)', fontSize: 13 }}>← back to gifts</Link>
      </div>
    </div>
  )
}
