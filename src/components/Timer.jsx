import { useState, useEffect, useRef } from 'react'

export default function Timer({ minutes, label }) {
  const [timeLeft, setTimeLeft] = useState(minutes * 60)
  const [running, setRunning] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    setTimeLeft(minutes * 60)
    setRunning(false)
    clearInterval(ref.current)
  }, [minutes])

  useEffect(() => {
    if (running) {
      ref.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) { clearInterval(ref.current); setRunning(false); return 0 }
          return t - 1
        })
      }, 1000)
    } else clearInterval(ref.current)
    return () => clearInterval(ref.current)
  }, [running])

  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
  const pct = ((minutes * 60 - timeLeft) / (minutes * 60)) * 100

  return (
    <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: var_r, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 3 }}>{label}</div>
        <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--blue)', fontVariantNumeric: 'tabular-nums' }}>{fmt(timeLeft)}</div>
        <div style={{ height: 3, background: 'var(--border)', borderRadius: 2, marginTop: 6 }}>
          <div style={{ height: '100%', width: `${pct}%`, background: 'var(--amber)', borderRadius: 2, transition: 'width 1s linear' }} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
        <button onClick={() => { clearInterval(ref.current); setTimeLeft(minutes * 60); setRunning(false) }}
          style={{ padding: '7px 12px', border: '1px solid var(--border)', borderRadius: 8, background: 'transparent', fontSize: 12, color: 'var(--muted)' }}>
          リセット
        </button>
        <button onClick={() => timeLeft > 0 ? setRunning(r => !r) : null}
          style={{ padding: '7px 18px', border: 'none', borderRadius: 8, background: running ? '#C04B1F' : 'var(--blue)', color: '#fff', fontWeight: 600, fontSize: 13, minWidth: 84 }}>
          {running ? '⏸ 停止' : timeLeft === minutes * 60 ? '▶ スタート' : '▶ 再開'}
        </button>
      </div>
    </div>
  )
}

const var_r = 'var(--radius)'
