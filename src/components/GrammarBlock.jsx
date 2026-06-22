export default function GrammarBlock({ grammar }) {
  return (
    <div>
      <div style={card}>
        <h3 style={h3}>{grammar.title}</h3>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{grammar.intro}</p>
      </div>
      {grammar.sections.map((sec, si) => (
        <div key={si} style={card}>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--blue)', marginBottom: 10 }}>{sec.title}</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {sec.items.map((item, ii) => (
              <div key={ii} style={{
                display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 12, alignItems: 'start',
                padding: '10px 12px', borderRadius: 8, background: ii % 2 === 0 ? 'var(--bg)' : '#fff'
              }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--blue)' }}>{item.label}</span>
                <span style={{ fontSize: 13, color: 'var(--muted)', fontStyle: 'italic' }}>{item.note}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const card = { background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 16, marginBottom: 12 }
const h3 = { fontSize: 16, fontWeight: 700, color: 'var(--blue)', marginBottom: 8 }
