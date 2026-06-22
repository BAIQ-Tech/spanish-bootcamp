export default function ListeningBlock({ listening }) {
  return (
    <div>
      <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 16, marginBottom: 12 }}>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>
          今日のリスニングは<strong style={{ color: 'var(--text)' }}>「音に慣れること」</strong>が目的です。全部わからなくてOK。スペイン語のリズムとイントネーションを体に染み込ませましょう。
        </p>
      </div>
      {listening.map((item, i) => (
        <div key={i} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 16, marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--blue)', flex: 1 }}>
              {['①','②','③'][i]} {item.title}
            </h4>
            <span style={{ fontSize: 11, color: 'var(--muted)', background: 'var(--bg)', padding: '2px 8px', borderRadius: 12, flexShrink: 0, marginLeft: 8 }}>{item.duration}</span>
          </div>
          <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: '0 0 10px' }}>{item.description}</p>
          {item.url && (
            <a href={item.url} target="_blank" rel="noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '7px 14px', background: 'var(--blue-light)', color: 'var(--blue)',
              borderRadius: 8, fontSize: 12, fontWeight: 600, textDecoration: 'none', marginBottom: 10
            }}>
              🔗 開く
            </a>
          )}
          {!item.url && (
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--blue)', marginBottom: 8 }}>📋 手元で実践する</div>
          )}
          <div style={{ background: '#FEF3E2', borderRadius: 8, padding: '8px 12px', fontSize: 12, color: '#7A5A00' }}>
            💡 {item.tip}
          </div>
        </div>
      ))}
    </div>
  )
}
