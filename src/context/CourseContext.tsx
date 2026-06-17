import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { ProgressState } from '../data/types'
import { COURSE_DATA, getFlatLessons, getTotalLessons } from '../data/course'

const STORAGE_KEY = 'bpm-mi-gusto-progress'

const defaultProgress: ProgressState = {
  completedLessons: [],
  currentModuleId: COURSE_DATA.modules[0].id,
  currentLessonId: COURSE_DATA.modules[0].lessons[0].id,
  startedAt: null,
  completedAt: null,
}

interface CourseContextValue {
  progress: ProgressState
  totalLessons: number
  completedCount: number
  percentComplete: number
  isLessonCompleted: (lessonId: string) => boolean
  markCurrentComplete: () => void
  goToLesson: (moduleId: string, lessonId: string) => void
  resetProgress: () => void
  isEvaluationActive: boolean
  setIsEvaluationActive: (active: boolean) => void
  setUserName: (name: string) => void
  setEvaluationResult: (score: number, failed: boolean) => void
  resetUserEvaluation: (userName: string) => void
  logout: () => void
}

const CourseContext = createContext<CourseContextValue | null>(null)

export function CourseProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : { ...defaultProgress, startedAt: new Date().toISOString() }
    } catch {
      return { ...defaultProgress, startedAt: new Date().toISOString() }
    }
  })
  const [isEvaluationActive, setIsEvaluationActive] = useState(false)

  const totalLessons = getTotalLessons()
  const completedCount = progress.completedLessons.length
  const percentComplete = Math.round((completedCount / totalLessons) * 100)

  // Synchronize current progress state to the global participants list
  const saveParticipantToGlobalList = useCallback((state: ProgressState) => {
    if (!state.userName) return
    try {
      const saved = localStorage.getItem('bpm-capacitaciones-all-participants')
      const list = saved ? JSON.parse(saved) : []
      const index = list.findIndex((p: any) => p.userName === state.userName)
      const data = {
        userName: state.userName,
        startedAt: state.startedAt,
        completedAt: state.completedAt,
        evaluationScore: state.evaluationScore,
        evaluationFailed: state.evaluationFailed,
        completedLessonsCount: state.completedLessons.length,
        lastUpdated: new Date().toISOString()
      }
      if (index >= 0) {
        list[index] = data
      } else {
        list.push(data)
      }
      localStorage.setItem('bpm-capacitaciones-all-participants', JSON.stringify(list))
    } catch (e) {
      console.error(e)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    saveParticipantToGlobalList(progress)
  }, [progress, saveParticipantToGlobalList])

  const isLessonCompleted = useCallback(
    (lessonId: string) => progress.completedLessons.includes(lessonId),
    [progress.completedLessons]
  )

  const markCurrentComplete = useCallback(() => {
    setProgress(prev => {
      const { currentLessonId, completedLessons } = prev
      if (completedLessons.includes(currentLessonId)) return prev
      const next = [...completedLessons, currentLessonId]
      const allDone = next.length === totalLessons
      return {
        ...prev,
        completedLessons: next,
        completedAt: allDone ? new Date().toISOString() : prev.completedAt,
      }
    })
  }, [totalLessons])

  const goToLesson = useCallback((moduleId: string, lessonId: string) => {
    setProgress(prev => ({
      ...prev,
      currentModuleId: moduleId,
      currentLessonId: lessonId,
    }))
  }, [])

  const resetProgress = useCallback(() => {
    setProgress(prev => ({
      ...defaultProgress,
      userName: prev.userName, // Keep name registered!
      startedAt: new Date().toISOString(),
    }))
  }, [])

  const setUserName = useCallback((name: string) => {
    setProgress(prev => ({
      ...prev,
      userName: name,
      startedAt: prev.startedAt || new Date().toISOString(),
    }))
  }, [])

  const setEvaluationResult = useCallback((score: number, failed: boolean) => {
    setProgress(prev => ({
      ...prev,
      evaluationScore: score,
      evaluationFailed: failed,
      completedAt: !failed ? new Date().toISOString() : prev.completedAt,
    }))
  }, [])

  const resetUserEvaluation = useCallback((targetName: string) => {
    try {
      const saved = localStorage.getItem('bpm-capacitaciones-all-participants')
      if (saved) {
        const list = JSON.parse(saved)
        const index = list.findIndex((p: any) => p.userName === targetName)
        if (index >= 0) {
          list[index].evaluationFailed = undefined
          list[index].evaluationScore = undefined
          localStorage.setItem('bpm-capacitaciones-all-participants', JSON.stringify(list))
        }
      }
    } catch (e) {
      console.error(e)
    }

    setProgress(prev => {
      if (prev.userName === targetName) {
        return {
          ...prev,
          evaluationFailed: undefined,
          evaluationScore: undefined,
        }
      }
      return prev
    })
  }, [])

  const logout = useCallback(() => {
    setProgress({ ...defaultProgress })
  }, [])

  return (
    <CourseContext.Provider
      value={{
        progress,
        totalLessons,
        completedCount,
        percentComplete,
        isLessonCompleted,
        markCurrentComplete,
        goToLesson,
        resetProgress,
        isEvaluationActive,
        setIsEvaluationActive,
        setUserName,
        setEvaluationResult,
        resetUserEvaluation,
        logout,
      }}
    >
      {children}
    </CourseContext.Provider>
  )
}

export function useCourse() {
  const ctx = useContext(CourseContext)
  if (!ctx) throw new Error('useCourse must be used inside CourseProvider')
  return ctx
}

/** Hook auxiliar: retorna info del módulo y lección actual */
export function useCurrentLesson() {
  const { progress } = useCourse()
  const flat = getFlatLessons()
  const lesson = flat.find(
    l => l.moduleId === progress.currentModuleId && l.id === progress.currentLessonId
  )
  const module = COURSE_DATA.modules.find(m => m.id === progress.currentModuleId)
  return { lesson, module }
}
