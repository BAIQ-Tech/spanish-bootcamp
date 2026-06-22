import { useState } from 'react'

export default function OutputBlock({ day }) {
  const [name, setName] = useState('')
  const [from, setFrom] = useState('')
  const [job, setJob] = useState('')

  const showIntro = day.outputType === 'intro' || day.outputType === 'final'
  const showIntroResult = name || from || job

  return (
    <div>
      {/* Output challenge banner */}
      <div style={{ background: 'var(--blue)', borderRadius: 'var(--radius-lg)', padding: 16, marginBottom: 14, color: '#fff' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: 4 }}>今日の課題</div>
        <div style={{ fontSize: 15, fontWeight: 700 }}>{day.outputChallenge}</div>
      </div>

      {/* Self-intro builder */}
      {showIntro && (
        <div style={card}>
          <h4 style={h4}>🏗️ 自己紹介ビルダー</h4>
          <p style={sub}>入力するとスペイン語の自己紹介文が自動生成されます。</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
            <Field label="あなたの名前" prefix="Me llamo" value={name} onChange={setName} placeholder="Aeron" />
            <Field label="出身地" prefix="Soy de" value={from} onChange={setFrom} placeholder="Yokohama, Japón" />
            <Field label="職業" prefix="Soy" value={job} onChange={setJob} placeholder="ingeniero de software" />
          </div>
          {showIntroResult && (
            <div style={{ background: 'var(--blue)', borderRadius: 10, padding: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: 10 }}>あなたの自己紹介 🎉</div>
              {name && <Line es={`Me llamo ${name}.`} ja={`私の名前は${name}です。`} />}
              {from && <Line es={`Soy de ${from}.`} ja={`${from}出身です。`} />}
              {job && <Line es={`Soy ${job}.`} ja={`${job}です。`} />}
            </div>
          )}
        </div>
      )}

      {/* Practice phrases */}
      <div style={card}>
        <h4 style={h4}>🗣️ 声に出す練習フレーズ</h4>
        <p style={sub}>各フレーズを5回以上声に出す。録音して聞き直すとさらに効果的。</p>
        {day.outputPhrases.map((p, i) => (
          <div key={i} style={{
            padding: '10px 14px', borderRadius: 9, borderLeft: '3px solid var(--amber)',
            background: 'var(--bg)', fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 8
          }}>{p}</div>
        ))}
      </div>

      {/* Checklist */}
      <div style={card}>
        <h4 style={h4}>✅ 今日のチェックリスト</h4>
        {day.checklistItems.map((item, i) => (
          <label key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8, cursor: 'pointer' }}>
            <input type="checkbox" style={{ marginTop: 2, accentColor: 'var(--blue)', flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: 'var(--muted)' }}>{item}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

function Field({ label, prefix, value, onChange, placeholder }) {
  return (
    <div>
      <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)', display: 'block', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>{label}</label>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 13, color: 'var(--muted)', whiteSpace: 'nowrap' }}>{prefix}</span>
        <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          style={{ flex: 1, padding: '8px 10px', border: '1px solid var(--border)', borderRadius: 8, fontSize: 14, fontWeight: 600, color: 'var(--blue)', background: 'var(--bg)', outline: 'none' }} />
        <span style={{ fontSize: 13, color: 'var(--muted)' }}>.</span>
      </div>
    </div>
  )
}

function Line({ es, ja }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{es}</div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{ja}</div>
    </div>
  )
}

const card = { background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 16, marginBottom: 12 }
const h4 = { fontSize: 14, fontWeight: 700, color: 'var(--blue)', marginBottom: 6 }
const sub = { fontSize: 13, color: 'var(--muted)', marginBottom: 12 }
