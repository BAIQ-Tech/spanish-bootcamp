import { useState } from 'react'
import Dashboard from './components/Dashboard.jsx'
import DayLesson from './components/DayLesson.jsx'
import { useProgress } from './hooks/useProgress.js'
import { curriculum } from './data/curriculum.js'

export default function App() {
  const [selectedDay, setSelectedDay] = useState(null)
  const { isDayComplete, getDayBlocks, markBlockDone, saveQuizScore, resetAll, completedDays } = useProgress()

  const dayData = selectedDay ? curriculum.find(d => d.day === selectedDay) : null

  if (selectedDay && dayData) {
    return (
      <DayLesson
        day={dayData}
        doneDayBlocks={getDayBlocks(selectedDay)}
        onBlockDone={idx => markBlockDone(selectedDay, idx)}
        onQuizDone={score => saveQuizScore(selectedDay, score)}
        onBack={() => setSelectedDay(null)}
      />
    )
  }

  return (
    <Dashboard
      onSelectDay={setSelectedDay}
      isDayComplete={isDayComplete}
      completedDays={completedDays}
      onReset={resetAll}
    />
  )
}
