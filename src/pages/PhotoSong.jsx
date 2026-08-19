import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'

export default function PhotoSong() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    if (playing) { a.pause(); setPlaying(false) }
    else { a.play().catch(() => {}); setPlaying(true) }
  }

  return (
    <div className="page" style={{ display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', minHeight: '90vh', textAlign: 'center' }}>

      <div className="card" style={{ padding: 16, maxWidth: 340, width: '100%' }}>
        {/* Photo placeholder — replace /public/photo.jpg with your own */}
        <img src="/photo.jpg" alt="" onError={e => { e.target.style.display = 'none' }}
          style={{ width: '100%', borderRadius: 14, marginBottom: 14, display: 'block' }} />

        <audio ref={audioRef} src="/song.mp3" loop preload="auto" />

        <div style={{ display: 'flex', alignItems: 'center', gap: 12,
          background: 'var(--bg2)', borderRadius: 14, padding: '10px 14px' }}>
          <button onClick={toggle} style={{
            width: 40, height: 40, borderRadius: '50%', border: 'none',
            background: 'var(--accent)', color: '#fff', fontSize: 16, cursor: 'pointer',
            flexShrink: 0,
          }}>
            {playing ? '⏸' : '▶'}
          </button>
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontSize: 13, fontWeight: 700 }}>our song</p>
            <p style={{ fontSize: 11, color: 'var(--muted)' }}>tap play</p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <Link to="/passed" style={{ color: 'var(--muted)', fontSize: 13 }}>← back to gifts</Link>
      </div>
    </div>
  )
}
