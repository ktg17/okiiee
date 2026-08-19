import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Confetti() {
  const pieces = Array.from({length: 24}, (_, i) => ({
    x: Math.random() * 100, delay: Math.random() * 1.5, dur: 2.5 + Math.random() * 2,
    color: ['#ff8fab','#e0567f','#ffc2d1','#ffd166','#c86fc9'][i % 5],
    size: 6 + Math.random() * 6, rot: Math.random() * 360,
  }))
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 5, overflow: 'hidden' }}>
      {pieces.map((p, i) => (
        <div key={i} style={{
          position: 'absolute', left: `${p.x}%`, top: '-20px',
          width: p.size, height: p.size, background: p.color,
          borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          transform: `rotate(${p.rot}deg)`,
          animation: `confettiFall ${p.dur}s ${p.delay}s ease-in infinite`, opacity: 0.9,
        }}/>
      ))}
      <style>{`@keyframes confettiFall{0%{transform:translateY(-20px) rotate(0deg);opacity:1}100%{transform:translateY(105vh) rotate(720deg);opacity:0}}`}</style>
    </div>
  )
}

const GIFTS = [
  { to: '/bouquet', label: 'bouquet', emoji: '💐' },
  { to: '/photo', label: 'photo & song', emoji: '📸' },
  { to: '/letter', label: 'a letter', emoji: '💌' },
]

export default function Passed() {
  const [opened, setOpened] = useState([])

  return (
    <div className="page" style={{ display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', minHeight: '90vh', textAlign: 'center' }}>

      <Confetti />

      <img src="/penguin-excited.png" alt="" style={{ width: 130, marginBottom: 12,
        animation: 'danceWiggle 0.8s ease-in-out infinite', zIndex: 10 }} />

      <h1 className="h1" style={{ marginBottom: 6, zIndex: 10 }}>you passed the love test</h1>
      <p className="lead" style={{ margin: '0 auto 32px', zIndex: 10 }}>
        your surprises are waiting for you
      </p>

      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center', zIndex: 10 }}>
        {GIFTS.map((g, i) => (
          <Link key={i} to={g.to} className="card" style={{
            width: 130, height: 130, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 8,
            textDecoration: 'none', color: 'var(--text)', cursor: 'pointer',
            transition: 'transform .2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06) rotate(-2deg)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
          >
            <span style={{ fontSize: 40 }}>{g.emoji}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)' }}>{g.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
