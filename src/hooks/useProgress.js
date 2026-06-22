import { useState, useCallback } from 'react'

const STORAGE_KEY = 'spanish_bootcamp_progress'

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch { return {} }
}

function saveProgress(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)) } catch {}
}

export function useProgress() {
  const [progress, setProgress] = useState(loadProgress)

  const markBlockDone = useCallback((day, blockIndex) => {
    setProgress(prev => {
      const next = { ...prev }
      if (!next[day]) next[day] = { blocks: [], quizScore: null }
      if (!next[day].blocks.includes(blockIndex)) {
        next[day] = { ...next[day], blocks: [...next[day].blocks, blockIndex] }
      }
      saveProgress(next)
      return next
    })
  }, [])

  const saveQuizScore = useCallback((day, score) => {
    setProgress(prev => {
      const next = { ...prev, [day]: { ...(prev[day] || { blocks: [] }), quizScore: score } }
      saveProgress(next)
      return next
    })
  }, [])

  const resetAll = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setProgress({})
  }, [])

  const isDayComplete = useCallback((day) => {
    return progress[day]?.blocks?.length >= 4
  }, [progress])

  const getDayBlocks = useCallback((day) => {
    return progress[day]?.blocks || []
  }, [progress])

  const completedDays = Object.keys(progress).filter(d => progress[d]?.blocks?.length >= 4).length

  return { progress, markBlockDone, saveQuizScore, resetAll, isDayComplete, getDayBlocks, completedDays }
}
