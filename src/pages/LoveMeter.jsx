import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

// Expression stops along the 0-100 range
const STOPS = [
  { pct: 0,   img: '/penguin-crying.png' },
  { pct: 25,  img: '/penguin-sad.png' },
  { pct: 50,  img: '/penguin-neutral.png' },
  { pct: 75,  img: '/penguin-happy.png' },
  { pct: 100, img: '/penguin-excited.png' },
]

const MESSAGES = [
  { max: 10,  text: "please...", color: '#7a8bb5' },
  { max: 26,  text: "that hurts...", color: '#c94f6d' },
  { max: 45,  text: "hmm, okay...", color: '#d67a91' },
  { max: 60,  text: "half? seriously?", color: '#e0567f' },
  { max: 80,  text: "aww, that's more like it!", color: '#e0567f' },
  { max: 100, text: "correct answer! ∞", color: '#e0567f' },
]

function getMessage(pct) {
  for (const m of MESSAGES) if (pct <= m.max) return m
  return MESSAGES[MESSAGES.length - 1]
}

export default function LoveMeter() {
  const [pct, setPct] = useState(0)
  const navigate = useNavigate()

  // Find which two stops we're between, and the blend ratio
  const { lower, upper, ratio } = useMemo(() => {
    let lo = STOPS[0], up = STOPS[STOPS.length - 1]
    for (let i = 0; i < STOPS.length - 1; i++) {
      if (pct >= STOPS[i].pct && pct <= STOPS[i + 1].pct) {
        lo = STOPS[i]; up = STOPS[i + 1]
        break
      }
    }
    const range = up.pct - lo.pct || 1
    const r = (pct - lo.pct) / range
    return { lower: lo, upper: up, ratio: r }
  }, [pct])

  const msg = getMessage(pct)
  const isMax = pct === 100

  // Rotation angle for gauge needle: -90deg (0%) to +90deg (100%)
  const angle = -90 + (pct / 100) * 180

  const handleChange = (e) => {
    const val = Number(e.target.value)
    setPct(val)
  }

  const handleContinue = () => {
    if (isMax) navigate('/passed')
  }

  return (
    <div className="page" style={{ display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', minHeight: '90vh', textAlign: 'center' }}>

      {/* Crossfading penguin */}
      <div style={{ position: 'relative', width: 180, height: 180, marginBottom: 8 }}>
        <img src={lower.img} alt="" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'contain', opacity: 1 - ratio, transition: 'opacity .15s linear',
          animation: isMax ? 'danceWiggle 0.6s ease-in-out infinite' : 'none',
        }} />
        <img src={upper.img} alt="" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'contain', opacity: ratio, transition: 'opacity .15s linear',
          animation: isMax ? 'danceWiggle 0.6s ease-in-out infinite .1s' : 'none',
        }} />

        {/* Sparkles when near/at max */}
        {pct > 80 && (
          <>
            <span style={{ position: 'absolute', top: -6, left: -6, fontSize: 20,
              animation: 'sparkle 1.2s ease-in-out infinite' }}>✨</span>
            <span style={{ position: 'absolute', top: 10, right: -10, fontSize: 16,
              animation: 'sparkle 1.4s ease-in-out infinite .3s' }}>✨</span>
            <span style={{ position: 'absolute', bottom: 0, left: 0, fontSize: 14,
              animation: 'sparkle 1s ease-in-out infinite .6s' }}>💗</span>
            <span style={{ position: 'absolute', bottom: 10, right: -4, fontSize: 18,
              animation: 'sparkle 1.3s ease-in-out infinite .2s' }}>💗</span>
          </>
        )}
      </div>

      <p style={{ fontSize: 20, fontWeight: 700, color: msg.color, marginBottom: 4,
        transition: 'color .3s' }}>
        {msg.text}
      </p>
      <p style={{ fontSize: 32, fontWeight: 800, color: 'var(--accent)', marginBottom: 24 }}>
        {isMax ? '∞' : `${pct}%`}
      </p>

      {/* Gauge */}
      <div style={{ position: 'relative', width: 220, height: 120, marginBottom: 20 }}>
        <svg width="220" height="120" viewBox="0 0 220 120">
          <path d="M 20 110 A 90 90 0 0 1 210 110" fill="none" stroke="#f3c6d3" strokeWidth="16" strokeLinecap="round"/>
          <path d="M 20 110 A 90 90 0 0 1 210 110" fill="none"
            stroke="url(#grad)" strokeWidth="16" strokeLinecap="round"
            strokeDasharray={`${(pct/100) * 283} 283`} />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f3c6d3"/>
              <stop offset="100%" stopColor="#e0567f"/>
            </linearGradient>
          </defs>
          <text x="30" y="105" fontSize="14" fill="#e0567f">♡</text>
          <text x="185" y="105" fontSize="14" fill="#e0567f">♡✨</text>
        </svg>
        {/* Needle */}
        <div style={{
          position: 'absolute', left: '50%', bottom: 10, width: 3, height: 70,
          background: '#6b2c43', transformOrigin: 'bottom center',
          transform: `translateX(-50%) rotate(${angle}deg)`,
          transition: 'transform .15s linear', borderRadius: 2,
        }}/>
        <div style={{ position: 'absolute', left: '50%', bottom: 4, width: 12, height: 12,
          background: '#6b2c43', borderRadius: '50%', transform: 'translateX(-50%)' }}/>
      </div>

      <input
        type="range" min="0" max="100" value={pct} onChange={handleChange}
        style={{ width: 260, accentColor: 'var(--accent)', marginBottom: 28 }}
      />

      {isMax ? (
        <button className="btn" onClick={handleContinue} style={{ animation: 'fadeUp .4s ease both' }}>
          continue →
        </button>
      ) : (
        <p style={{ color: 'var(--muted)', fontSize: 13 }}>
          slide all the way to the right... 👉
        </p>
      )}
    </div>
  )
}
