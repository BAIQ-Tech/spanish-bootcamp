import { curriculum, weeks } from '../data/curriculum.js'

export default function Dashboard({ onSelectDay, isDayComplete, completedDays, onReset }) {
  const weekGroups = weeks.map(w => ({
    ...w,
    days: curriculum.filter(d => d.week === w.week)
  }))

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Header */}
      <div style={{ background: 'var(--blue)', padding: '24px 16px 20px' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: '#E8C56A', textTransform: 'uppercase', marginBottom: 6 }}>
            3週間集中プログラム
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: '#fff', margin: '0 0 4px' }}>
            スペイン語 21日間ブートキャンプ
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, margin: 0 }}>
            ゼロから日常会話レベルへ — 1日3時間20分 × 21日間
          </p>
          {/* Overall progress */}
          <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.15)', borderRadius: 3 }}>
              <div style={{ height: '100%', width: `${(completedDays / 21) * 100}%`, background: '#E8C56A', borderRadius: 3, transition: 'width 0.4s' }} />
            </div>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', flexShrink: 0 }}>{completedDays} / 21 日完了</span>
          </div>
        </div>
      </div>

      {/* Daily schedule summary */}
      <div style={{ background: '#fff', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 780, margin: '0 auto', padding: '12px 16px', display: 'flex', gap: 16, overflowX: 'auto' }}>
          {[['📖', '90分', '文法・語彙'], ['🎧', '45分', 'リスニング'], ['🗣️', '45分', 'アウトプット'], ['🔁', '20分', '復習クイズ']].map(([em, t, lb]) => (
            <div key={lb} style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
              <span style={{ fontSize: 16 }}>{em}</span>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--blue)' }}>{t}</div>
                <div style={{ fontSize: 10, color: 'var(--muted)' }}>{lb}</div>
              </div>
            </div>
          ))}
          <div style={{ marginLeft: 'auto', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--amber)' }}>合計 200分 / 日</span>
          </div>
        </div>
      </div>

      {/* Week sections */}
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '20px 16px 40px' }}>
        {weekGroups.map(w => (
          <div key={w.week} style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 4, height: 28, background: w.color, borderRadius: 2 }} />
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: w.color, textTransform: 'uppercase', letterSpacing: 1 }}>Week {w.week}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{w.title.split('—')[1]?.trim()}</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10 }}>
              {w.days.map(day => {
                const done = isDayComplete(day.day)
                const isReview = day.isReviewDay
                return (
                  <button key={day.day} onClick={() => onSelectDay(day.day)}
                    style={{
                      background: done ? 'var(--green-light)' : '#fff',
                      border: `1px solid ${done ? 'var(--green)' : isReview ? w.color : 'var(--border)'}`,
                      borderRadius: 'var(--radius-lg)', padding: '14px 14px', cursor: 'pointer',
                      textAlign: 'left', transition: 'transform 0.15s, box-shadow 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: done ? 'var(--green)' : w.color, textTransform: 'uppercase' }}>
                        Day {day.day}
                      </span>
                      {done && <span style={{ fontSize: 14 }}>✅</span>}
                      {isReview && !done && <span style={{ fontSize: 11, background: `${w.color}22`, color: w.color, padding: '2px 6px', borderRadius: 6, fontWeight: 700 }}>復習</span>}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', lineHeight: 1.4 }}>{day.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>{day.vocabTheme}</div>
                  </button>
                )
              })}
            </div>
          </div>
        ))}

        {/* Reset button */}
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button onClick={() => { if (confirm('進捗をリセットしますか？')) onReset() }}
            style={{ padding: '8px 18px', border: '1px solid var(--border)', borderRadius: 8, background: 'transparent', color: 'var(--muted)', fontSize: 12, cursor: 'pointer' }}>
            進捗をリセット
          </button>
        </div>
      </div>
    </div>
  )
}
