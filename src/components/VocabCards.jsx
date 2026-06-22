import { useState } from 'react'

export default function VocabCards({ vocab }) {
  const [flipped, setFlipped] = useState({})
  const toggle = i => setFlipped(p => ({ ...p, [i]: !p[i] }))

  return (
    <div>
      <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 10 }}>カードをタップして日本語訳を確認しましょう。</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))', gap: 8 }}>
        {vocab.map((v, i) => (
          <div key={i} onClick={() => toggle(i)} style={{
            borderRadius: 'var(--radius)', padding: '12px 10px', cursor: 'pointer',
            border: '1px solid var(--border)', minHeight: 76,
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            background: flipped[i] ? 'var(--blue)' : '#fff',
            transition: 'background 0.2s',
          }}>
            {!flipped[i] ? (
              <>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{v.es}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 3 }}>{v.kata}</div>
                <div style={{ fontSize: 10, color: 'var(--border)', marginTop: 4 }}>タップ →</div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#E8C56A' }}>{v.ja}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 3 }}>{v.es}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 4, fontStyle: 'italic' }}>{v.example}</div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
