import { useState, useMemo } from 'react'

export default function Quiz({ quiz, onComplete }) {
  const shuffled = useMemo(() => [...quiz].sort(() => Math.random() - 0.5), [quiz])
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const options = useMemo(() => {
    if (idx >= shuffled.length) return []
    // Use the quiz options as-is (already 4 options per question)
    return shuffled[idx].opts.map((o, i) => ({ text: o, correct: i === shuffled[idx].ans }))
  }, [idx, shuffled])

  const choose = (opt) => {
    if (selected !== null) return
    setSelected(opt)
    if (opt.correct) setScore(s => s + 1)
    setTimeout(() => {
      const nextIdx = idx + 1
      if (nextIdx >= shuffled.length) {
        setDone(true)
        onComplete?.(opt.correct ? score + 1 : score)
      } else {
        setIdx(nextIdx)
        setSelected(null)
      }
    }, 1000)
  }

  if (done) return (
    <div style={{ textAlign: 'center', padding: '32px 0' }}>
      <div style={{ fontSize: 48 }}>🌟</div>
      <h3 style={{ marginTop: 12, color: 'var(--blue)' }}>クイズ完了！</h3>
      <p style={{ color: 'var(--muted)', marginTop: 6 }}>スコア: <strong style={{ color: 'var(--blue)' }}>{score} / {shuffled.length}</strong></p>
      <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8 }}>間違えた単語はAnkiに追加して明日復習しましょう。</p>
    </div>
  )

  const q = shuffled[idx]
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ fontSize: 12, color: 'var(--muted)' }}>問題 {idx + 1} / {shuffled.length}</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--blue)' }}>スコア: {score}</span>
      </div>
      <div style={{ height: 4, background: 'var(--border)', borderRadius: 2, marginBottom: 20 }}>
        <div style={{ height: '100%', width: `${(idx / shuffled.length) * 100}%`, background: 'var(--blue)', borderRadius: 2, transition: 'width 0.3s' }} />
      </div>
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <p style={{ fontSize: 12, color: 'var(--muted)' }}>次のスペイン語/フレーズの意味は？</p>
        <p style={{ fontSize: 26, fontWeight: 800, color: 'var(--blue)', margin: '8px 0' }}>{q.q.replace('の意味は？', '').replace('は？', '')}</p>
        <p style={{ fontSize: 11, color: 'var(--muted)' }}>{q.q.includes('の意味は') ? '→ 意味を選んでください' : q.q}</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {options.map((opt, i) => {
          let bg = '#fff', border = '1px solid var(--border)', color = 'var(--text)'
          if (selected) {
            if (opt.correct) { bg = 'var(--green-light)'; border = '1px solid var(--green)'; color = 'var(--green)' }
            else if (opt === selected && !opt.correct) { bg = 'var(--red-light)'; border = '1px solid var(--red)'; color = 'var(--red)' }
          }
          return (
            <button key={i} onClick={() => choose(opt)} style={{
              padding: '13px 10px', borderRadius: 'var(--radius)', border, background: bg, color,
              fontSize: 13, fontWeight: 500, textAlign: 'center', lineHeight: 1.4,
              cursor: selected ? 'default' : 'pointer', transition: 'all 0.15s'
            }}>
              {opt.text}
            </button>
          )
        })}
      </div>
    </div>
  )
}
