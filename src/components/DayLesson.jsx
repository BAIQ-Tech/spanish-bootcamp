import { useState } from 'react'
import Timer from './Timer.jsx'
import GrammarBlock from './GrammarBlock.jsx'
import VocabCards from './VocabCards.jsx'
import ListeningBlock from './ListeningBlock.jsx'
import OutputBlock from './OutputBlock.jsx'
import Quiz from './Quiz.jsx'

const BLOCKS = [
  { label: 'Block 1', title: '文法・語彙', emoji: '📖', minutes: 90 },
  { label: 'Block 2', title: 'リスニング', emoji: '🎧', minutes: 45 },
  { label: 'Block 3', title: 'アウトプット', emoji: '🗣️', minutes: 45 },
  { label: 'Block 4', title: '復習クイズ', emoji: '🔁', minutes: 20 },
]

export default function DayLesson({ day, doneDayBlocks, onBlockDone, onQuizDone, onBack }) {
  const [activeBlock, setActiveBlock] = useState(0)
  const blocksDone = doneDayBlocks || []
  const progress = (blocksDone.length / 4) * 100
  const allDone = blocksDone.length >= 4

  const completeBlock = (idx) => {
    if (!blocksDone.includes(idx)) onBlockDone(idx)
    if (idx < 3) setActiveBlock(idx + 1)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Sticky header */}
      <div style={{ position: 'sticky', top: 0, background: 'var(--blue)', zIndex: 100, padding: '0 0 0' }}>
        <div style={{ padding: '14px 16px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
            <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
              ← ダッシュボード
            </button>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Day {day.day} / 21</span>
          </div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: '#E8C56A', textTransform: 'uppercase', marginBottom: 3 }}>
            Week {day.week} — {day.grammarTheme}
          </div>
          <h1 style={{ fontSize: 18, fontWeight: 800, color: '#fff', margin: 0 }}>{day.title}</h1>
          {/* Progress bar */}
          <div style={{ height: 3, background: 'rgba(255,255,255,0.15)', borderRadius: 2, margin: '12px 0 0' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: '#E8C56A', borderRadius: 2, transition: 'width 0.4s' }} />
          </div>
        </div>
        {/* Block tabs */}
        <div style={{ display: 'flex', gap: 2, padding: '8px 16px 0', overflowX: 'auto' }}>
          {BLOCKS.map((b, i) => (
            <button key={i} onClick={() => setActiveBlock(i)} style={{
              padding: '8px 14px', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700,
              borderRadius: '8px 8px 0 0', whiteSpace: 'nowrap', transition: 'all 0.15s',
              background: activeBlock === i ? 'var(--bg)' : 'transparent',
              color: activeBlock === i ? 'var(--blue)' : 'rgba(255,255,255,0.65)',
              display: 'flex', alignItems: 'center', gap: 5,
            }}>
              {blocksDone.includes(i) && <span style={{ color: '#4CAF50' }}>✓</span>}
              {b.emoji} {b.label}
              <span style={{ fontSize: 10, fontWeight: 400, opacity: 0.7 }}>({b.minutes}分)</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '16px 16px 40px' }}>
        <Timer minutes={BLOCKS[activeBlock].minutes} label={`${BLOCKS[activeBlock].emoji} ${BLOCKS[activeBlock].title}`} />

        {/* Block 1: Grammar + Vocab */}
        {activeBlock === 0 && (
          <div>
            <GrammarBlock grammar={day.grammar} />
            <SectionHead>💬 今日の語彙 {day.vocab.length}語 — タップして裏返す</SectionHead>
            <div style={cardStyle}>
              <VocabCards vocab={day.vocab} />
            </div>
            <CompleteBtn done={blocksDone.includes(0)} onClick={() => completeBlock(0)} label="Block 1 完了 → Block 2へ" />
          </div>
        )}

        {/* Block 2: Listening */}
        {activeBlock === 1 && (
          <div>
            <ListeningBlock listening={day.listening} />
            <CompleteBtn done={blocksDone.includes(1)} onClick={() => completeBlock(1)} label="Block 2 完了 → Block 3へ" />
          </div>
        )}

        {/* Block 3: Output */}
        {activeBlock === 2 && (
          <div>
            <OutputBlock day={day} />
            <CompleteBtn done={blocksDone.includes(2)} onClick={() => completeBlock(2)} label="Block 3 完了 → Block 4へ" />
          </div>
        )}

        {/* Block 4: Quiz + Review */}
        {activeBlock === 3 && (
          <div>
            <div style={cardStyle}>
              <Quiz quiz={day.quiz} onComplete={score => { onQuizDone(score); }} />
            </div>

            {/* Day 2 preview */}
            {day.day < 21 && (
              <div style={{ background: 'var(--blue)', borderRadius: 'var(--radius-lg)', padding: 18, margin: '12px 0' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.55)', marginBottom: 4 }}>📅 明日の予告</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Day {day.day + 1}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>{day.vocabTheme} の次は… 新しい文法テーマへ！</div>
              </div>
            )}

            <CompleteBtn done={blocksDone.includes(3)} onClick={() => completeBlock(3)} label={day.day === 21 ? '🎉 21日間完走！' : 'Day 完了！'} />

            {allDone && (
              <div style={{ textAlign: 'center', padding: '24px 16px', background: 'linear-gradient(135deg, var(--blue), var(--blue-mid))', borderRadius: 'var(--radius-lg)', marginTop: 12 }}>
                <div style={{ fontSize: 40 }}>{day.day === 21 ? '🏆' : '⭐'}</div>
                <h3 style={{ color: '#fff', margin: '12px 0 6px' }}>Day {day.day} クリア！</h3>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13 }}>
                  {day.day === 21 ? '¡Felicidades! 21日間のブートキャンプを完走しました！' : '¡Muy bien! また明日も続けましょう。'}
                </p>
                {day.day < 21 && (
                  <button onClick={onBack} style={{ marginTop: 14, padding: '10px 24px', border: 'none', borderRadius: 8, background: '#E8C56A', color: 'var(--blue)', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                    ダッシュボードに戻る
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function SectionHead({ children }) {
  return <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--blue)', margin: '16px 0 8px' }}>{children}</h3>
}

function CompleteBtn({ done, onClick, label }) {
  return (
    <button onClick={done ? undefined : onClick} style={{
      width: '100%', padding: 14, border: 'none', borderRadius: 'var(--radius-lg)', fontSize: 14,
      fontWeight: 700, cursor: done ? 'default' : 'pointer', marginTop: 10,
      background: done ? 'var(--green-light)' : 'var(--amber)',
      color: done ? 'var(--green)' : '#fff',
      borderTop: done ? "1px solid var(--green)" : "none",
      transition: 'all 0.2s'
    }}>
      {done ? '✅ 完了済み' : label}
    </button>
  )
}

const cardStyle = { background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 16, marginBottom: 12 }
