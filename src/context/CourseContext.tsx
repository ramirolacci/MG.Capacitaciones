import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import type { ProgressState, Course } from '../data/types'
import { COURSES_DATA, getFlatLessons, getTotalLessons } from '../data/course'
import { supabase } from '../utils/supabase'
import { TRAININGS } from '../data/trainings'

const GLOBAL_USERNAME_KEY = 'bpm-mi-gusto-global-username'
const ACTIVE_TRAINING_KEY = 'bpm-mi-gusto-active-training-id'

const defaultProgressFor = (trainingId: string, userName?: string): ProgressState => {
  const course = COURSES_DATA[trainingId] || COURSES_DATA.calidad
  return {
    completedLessons: [],
    currentModuleId: course.modules[0].id,
    currentLessonId: course.modules[0].lessons[0].id,
    startedAt: new Date().toISOString(),
    completedAt: null,
    userName: userName || undefined,
    trainingId,
  }
}

interface CourseContextValue {
  progress: ProgressState
  courseData: Course
  totalLessons: number
  completedCount: number
  percentComplete: number
  isLessonCompleted: (lessonId: string) => boolean
  markCurrentComplete: () => void
  goToLesson: (moduleId: string, lessonId: string) => void
  resetProgress: () => void
  isEvaluationActive: boolean
  setIsEvaluationActive: (active: boolean) => void
  setUserName: (name: string, trainingId?: string) => Promise<void>
  setEvaluationResult: (score: number, failed: boolean) => void
  resetUserEvaluation: (userName: string, trainingId: string) => void
  selectTraining: (trainingId: string) => void
  logout: () => void
  syncProgressWithDatabase: () => Promise<void>
  updateUserName: (oldName: string, newName: string) => Promise<void>
}

const THEME_PALETTES = {
  white: {
    '--brand-50': '#f8fafc',
    '--brand-100': '#f1f5f9',
    '--brand-200': '#e2e8f0',
    '--brand-300': '#cbd5e1',
    '--brand-400': '#94a3b8',
    '--brand-500': '#64748b',
    '--brand-600': '#ffffff',
    '--brand-700': '#e2e8f0',
    '--brand-800': '#cbd5e1',
    '--brand-900': '#94a3b8',
    '--brand-950': '#475569',
    '--brand-text': '#0f1923',
    '--brand-glow': 'rgba(255, 255, 255, 0.4)',
  },
  red: {
    '--brand-50': '#fef2f2',
    '--brand-100': '#fee2e2',
    '--brand-200': '#fecaca',
    '--brand-300': '#fca5a5',
    '--brand-400': '#f87171',
    '--brand-500': '#ef4444',
    '--brand-600': '#ef4444',
    '--brand-700': '#dc2626',
    '--brand-800': '#b91c1c',
    '--brand-900': '#991b1b',
    '--brand-950': '#7f1d1d',
    '--brand-text': '#ffffff',
    '--brand-glow': 'rgba(239, 68, 68, 0.4)',
  },
  green: {
    '--brand-50': '#f0fdf4',
    '--brand-100': '#dcfce7',
    '--brand-200': '#bbf7d0',
    '--brand-300': '#86efac',
    '--brand-400': '#4ade80',
    '--brand-500': '#22c55e',
    '--brand-600': '#2d6a4f',
    '--brand-700': '#1a4a38',
    '--brand-800': '#145030',
    '--brand-900': '#0d3320',
    '--brand-950': '#052010',
    '--brand-text': '#ffffff',
    '--brand-glow': 'rgba(45, 106, 79, 0.4)',
  },
  yellow: {
    '--brand-50': '#fefce8',
    '--brand-100': '#fef9c3',
    '--brand-200': '#fef08a',
    '--brand-300': '#fde047',
    '--brand-400': '#facc15',
    '--brand-500': '#eab308',
    '--brand-600': '#eab308',
    '--brand-700': '#ca8a04',
    '--brand-800': '#a16207',
    '--brand-900': '#854d0e',
    '--brand-950': '#713f12',
    '--brand-text': '#0f1923',
    '--brand-glow': 'rgba(234, 179, 8, 0.4)',
  },
  black: {
    '--brand-50': '#f8fafc',
    '--brand-100': '#f1f5f9',
    '--brand-200': '#e2e8f0',
    '--brand-300': '#cbd5e1',
    '--brand-400': '#94a3b8',
    '--brand-500': '#475569',
    '--brand-600': '#18181b',
    '--brand-700': '#27272a',
    '--brand-800': '#3f3f46',
    '--brand-900': '#52525b',
    '--brand-950': '#09090b',
    '--brand-text': '#ffffff',
    '--brand-glow': 'rgba(148, 163, 184, 0.3)',
  },
  blue: {
    '--brand-50': '#eff6ff',
    '--brand-100': '#dbeafe',
    '--brand-200': '#bfdbfe',
    '--brand-300': '#93c5fd',
    '--brand-400': '#60a5fa',
    '--brand-500': '#3b82f6',
    '--brand-600': '#2563eb',
    '--brand-700': '#1d4ed8',
    '--brand-800': '#1e40af',
    '--brand-900': '#1e3a8a',
    '--brand-950': '#172554',
    '--brand-text': '#ffffff',
    '--brand-glow': 'rgba(59, 130, 246, 0.4)',
  },
} as const

function hexToRgb(hex: string): string | null {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b)
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex)
  return result
    ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}`
    : null
}

const CourseContext = createContext<CourseContextValue | null>(null)

export function CourseProvider({ children }: { children: ReactNode }) {
  const location = useLocation()

  // Load initial active training and username
  const [activeTrainingId, setActiveTrainingId] = useState<string>(() => {
    return localStorage.getItem(ACTIVE_TRAINING_KEY) || 'calidad'
  })

  const [progress, setProgress] = useState<ProgressState>(() => {
    try {
      const globalUser = localStorage.getItem(GLOBAL_USERNAME_KEY) || ''
      const tId = localStorage.getItem(ACTIVE_TRAINING_KEY) || 'calidad'
      const saved = localStorage.getItem(`bpm-mi-gusto-progress_${tId}`)
      if (saved) {
        const parsed = JSON.parse(saved)
        // Ensure username is synced with global username
        if (globalUser && parsed.userName !== globalUser) {
          parsed.userName = globalUser
        }
        return parsed
      }
      return defaultProgressFor(tId, globalUser)
    } catch {
      const globalUser = localStorage.getItem(GLOBAL_USERNAME_KEY) || ''
      const tId = localStorage.getItem(ACTIVE_TRAINING_KEY) || 'calidad'
      return defaultProgressFor(tId, globalUser)
    }
  })

  const [isEvaluationActive, setIsEvaluationActive] = useState(false)

  // Set page-level CSS custom variables according to active sector/course theme
  useEffect(() => {
    let currentTheme: 'white' | 'red' | 'green' | 'yellow' | 'black' | 'blue' = 'green'
    const path = location.pathname.replace(/^\/|\/$/g, '')

    const trainingByPath = TRAININGS.find(t => t.id === path)
    if (trainingByPath) {
      currentTheme = trainingByPath.themeColor
    } else if (path === 'curso') {
      const training = TRAININGS.find(t => t.id === progress.trainingId)
      if (training) {
        currentTheme = training.themeColor
      }
    } else if (path === '') {
      currentTheme = 'green'
    }

    const palette = THEME_PALETTES[currentTheme] || THEME_PALETTES.green
    Object.entries(palette).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value)
      if (key.startsWith('--brand-') && key !== '--brand-text' && key !== '--brand-glow') {
        const rgb = hexToRgb(value)
        if (rgb) {
          document.documentElement.style.setProperty(`${key}-rgb`, rgb)
        }
      }
    })
  }, [location.pathname, progress.trainingId])

  // Dynamic course data based on current trainingId in state
  const courseData = COURSES_DATA[progress.trainingId || 'calidad'] || COURSES_DATA.calidad
  const totalLessons = getTotalLessons(courseData)
  const completedCount = progress.completedLessons.length
  const percentComplete = Math.round((completedCount / totalLessons) * 100)

  // Synchronize current progress state to the global participants list
  const saveParticipantToGlobalList = useCallback((state: ProgressState) => {
    if (!state.userName) return
    const data = {
      userName: state.userName,
      startedAt: state.startedAt,
      completedAt: state.completedAt,
      evaluationScore: state.evaluationScore,
      evaluationFailed: state.evaluationFailed,
      completedLessonsCount: state.completedLessons.length,
      lastUpdated: new Date().toISOString(),
      trainingId: state.trainingId || 'calidad'
    }

    try {
      const saved = localStorage.getItem('bpm-capacitaciones-all-participants')
      const list = saved ? JSON.parse(saved) : []
      const index = list.findIndex((p: any) => p.userName === state.userName && p.trainingId === data.trainingId)
      if (index >= 0) {
        list[index] = data
      } else {
        list.push(data)
      }
      localStorage.setItem('bpm-capacitaciones-all-participants', JSON.stringify(list))
    } catch (e) {
      console.error(e)
    }

    // Upsert to Supabase database
    supabase
      .from('participants')
      .upsert({
        user_name: data.userName,
        started_at: data.startedAt,
        completed_at: data.completedAt,
        evaluation_score: data.evaluationScore,
        evaluation_failed: data.evaluationFailed,
        completed_lessons_count: data.completedLessonsCount,
        last_updated: data.lastUpdated,
        training_id: data.trainingId
      })
      .then(({ error }) => {
        if (error) {
          console.error('Error al guardar en Supabase:', error)
        }
      })
  }, [])

  // Persist progress and save to server
  useEffect(() => {
    if (progress.trainingId) {
      localStorage.setItem(`bpm-mi-gusto-progress_${progress.trainingId}`, JSON.stringify(progress))
      saveParticipantToGlobalList(progress)
    }
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
    setProgress(prev => {
      const tId = prev.trainingId || 'calidad'
      return defaultProgressFor(tId, prev.userName)
    })
  }, [])

  const setUserName = useCallback(async (name: string, trainingId?: string) => {
    const tId = trainingId || activeTrainingId

    try {
      const { data, error } = await supabase
        .from('participants')
        .select('*')
        .eq('user_name', name)
        .eq('training_id', tId)
        .maybeSingle()

      if (error) {
        console.error('Error fetching participant from Supabase:', error)
      }

      if (data) {
        throw new Error('ALREADY_REGISTERED')
      }
    } catch (e: any) {
      if (e.message === 'ALREADY_REGISTERED') {
        throw e
      }
      console.error('Error in setUserName sync:', e)
    }

    localStorage.setItem(GLOBAL_USERNAME_KEY, name)
    localStorage.setItem(ACTIVE_TRAINING_KEY, tId)
    setActiveTrainingId(tId)

    setProgress(prev => {
      // Try to load progress for this trainingId from local storage
      const saved = localStorage.getItem(`bpm-mi-gusto-progress_${tId}`)
      if (saved) {
        const parsed = JSON.parse(saved)
        return {
          ...parsed,
          userName: name,
          trainingId: tId,
        }
      }
      return {
        ...defaultProgressFor(tId, name),
        userName: name,
        trainingId: tId,
      }
    })
  }, [activeTrainingId])

  const selectTraining = useCallback((trainingId: string) => {
    localStorage.setItem(ACTIVE_TRAINING_KEY, trainingId)
    setActiveTrainingId(trainingId)
    const globalUser = localStorage.getItem(GLOBAL_USERNAME_KEY) || ''

    setProgress(prev => {
      // First save current training progress
      if (prev.trainingId) {
        localStorage.setItem(`bpm-mi-gusto-progress_${prev.trainingId}`, JSON.stringify(prev))
      }

      // Then load new training progress
      const saved = localStorage.getItem(`bpm-mi-gusto-progress_${trainingId}`)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (globalUser && parsed.userName !== globalUser) {
          parsed.userName = globalUser
        }
        return parsed
      }
      return defaultProgressFor(trainingId, globalUser)
    })
  }, [])

  const setEvaluationResult = useCallback((score: number, failed: boolean) => {
    setProgress(prev => ({
      ...prev,
      evaluationScore: score,
      evaluationFailed: failed,
      completedAt: !failed ? new Date().toISOString() : prev.completedAt,
    }))
  }, [])

  const resetUserEvaluation = useCallback((targetName: string, trainingId: string) => {
    try {
      const saved = localStorage.getItem('bpm-capacitaciones-all-participants')
      if (saved) {
        const list = JSON.parse(saved)
        const index = list.findIndex((p: any) => p.userName === targetName && p.trainingId === trainingId)
        if (index >= 0) {
          list[index].evaluationFailed = undefined
          list[index].evaluationScore = undefined
          localStorage.setItem('bpm-capacitaciones-all-participants', JSON.stringify(list))
        }
      }
    } catch (e) {
      console.error(e)
    }

    // Reset in Supabase database
    supabase
      .from('participants')
      .update({
        evaluation_score: null,
        evaluation_failed: null,
        last_updated: new Date().toISOString(),
      })
      .eq('user_name', targetName)
      .eq('training_id', trainingId)
      .then(({ error }) => {
        if (error) {
          console.error('Error al reiniciar evaluación en Supabase:', error)
        }
      })

    // Also update current active progress if it's the target user and training
    setProgress(prev => {
      // First, update target course in storage if it is not currently active
      if (prev.trainingId !== trainingId) {
        const saved = localStorage.getItem(`bpm-mi-gusto-progress_${trainingId}`)
        if (saved) {
          const parsed = JSON.parse(saved)
          if (parsed.userName === targetName) {
            parsed.evaluationFailed = undefined
            parsed.evaluationScore = undefined
            localStorage.setItem(`bpm-mi-gusto-progress_${trainingId}`, JSON.stringify(parsed))
          }
        }
      }

      if (prev.userName === targetName && (prev.trainingId || 'calidad') === trainingId) {
        return {
          ...prev,
          evaluationFailed: undefined,
          evaluationScore: undefined,
        }
      }
      return prev
    })
  }, [])

  const syncProgressWithDatabase = useCallback(async () => {
    if (!progress.userName || !progress.trainingId) return

    try {
      const { data, error } = await supabase
        .from('participants')
        .select('*')
        .eq('user_name', progress.userName)
        .eq('training_id', progress.trainingId)
        .maybeSingle()

      if (error) throw error

      if (data) {
        const dbFailed = data.evaluation_failed ?? undefined
        const dbScore = data.evaluation_score ?? undefined
        const dbLessonsCount = data.completed_lessons_count || 0
        const dbCompletedAt = data.completed_at || null

        setProgress(prev => {
          const needsUpdate =
            prev.evaluationFailed !== dbFailed ||
            prev.evaluationScore !== dbScore ||
            (dbCompletedAt && prev.completedAt !== dbCompletedAt) ||
            prev.completedLessons.length < dbLessonsCount

          if (needsUpdate) {
            const updated = {
              ...prev,
              evaluationFailed: dbFailed,
              evaluationScore: dbScore,
              completedAt: dbCompletedAt || prev.completedAt,
            }

            if (prev.completedLessons.length < dbLessonsCount) {
              const flat = getFlatLessons(COURSES_DATA[prev.trainingId || 'calidad'] || COURSES_DATA.calidad)
              updated.completedLessons = flat.slice(0, dbLessonsCount).map(l => l.id)
              const nextIndex = Math.min(dbLessonsCount, flat.length - 1)
              if (flat[nextIndex]) {
                updated.currentModuleId = flat[nextIndex].moduleId
                updated.currentLessonId = flat[nextIndex].id
              }
            }

            localStorage.setItem(`bpm-mi-gusto-progress_${prev.trainingId || 'calidad'}`, JSON.stringify(updated))
            return updated
          }

          return prev
        })
      }
    } catch (e) {
      console.error('Error syncing with database:', e)
    }
  }, [progress.userName, progress.trainingId])

  // Auto-sync with Supabase on mount/init when userName is set
  useEffect(() => {
    if (progress.userName && progress.trainingId) {
      syncProgressWithDatabase()
    }
  }, [progress.userName, progress.trainingId, syncProgressWithDatabase])

  const updateUserName = useCallback(async (oldName: string, newName: string) => {
    if (!newName || newName.trim() === oldName.trim()) return
    const trimmedNewName = newName.trim()
    const tId = progress.trainingId || 'calidad'

    // 1. Delete old participant record from Supabase
    try {
      const { error } = await supabase
        .from('participants')
        .delete()
        .eq('user_name', oldName)
        .eq('training_id', tId)

      if (error) {
        console.error('Error deleting old participant in Supabase:', error)
      }
    } catch (e) {
      console.error(e)
    }

    // 2. Update local storage keys
    localStorage.setItem(GLOBAL_USERNAME_KEY, trimmedNewName)
    
    // Update global list in local storage
    try {
      const saved = localStorage.getItem('bpm-capacitaciones-all-participants')
      if (saved) {
        const list = JSON.parse(saved)
        const updatedList = list.map((p: any) => {
          if (p.userName === oldName && p.trainingId === tId) {
            return { ...p, userName: trimmedNewName, lastUpdated: new Date().toISOString() }
          }
          return p
        })
        localStorage.setItem('bpm-capacitaciones-all-participants', JSON.stringify(updatedList))
      }
    } catch (e) {
      console.error(e)
    }

    // 3. Update active progress state
    setProgress(prev => {
      const saved = localStorage.getItem(`bpm-mi-gusto-progress_${tId}`)
      if (saved) {
        const parsed = JSON.parse(saved)
        const next = {
          ...parsed,
          userName: trimmedNewName,
        }
        localStorage.setItem(`bpm-mi-gusto-progress_${tId}`, JSON.stringify(next))
        return next
      }
      return {
        ...prev,
        userName: trimmedNewName,
      }
    })
  }, [progress.trainingId])

  const logout = useCallback(() => {
    localStorage.removeItem(GLOBAL_USERNAME_KEY)
    localStorage.removeItem(ACTIVE_TRAINING_KEY)
    
    // Reset state to initial default for 'calidad' without userName
    setProgress(defaultProgressFor('calidad'))
    setActiveTrainingId('calidad')
  }, [])

  return (
    <CourseContext.Provider
      value={{
        progress,
        courseData,
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
        selectTraining,
        logout,
        syncProgressWithDatabase,
        updateUserName,
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
  const { progress, courseData } = useCourse()
  const flat = getFlatLessons(courseData)
  const lesson = flat.find(
    l => l.moduleId === progress.currentModuleId && l.id === progress.currentLessonId
  )
  const module = courseData.modules.find(m => m.id === progress.currentModuleId)
  return { lesson, module }
}
