import { useCourse } from '../../context/CourseContext'
import { COURSE_DATA, getNextLesson, getPrevLesson } from '../../data/course'
import { GlobalProgressBar } from '../course/LessonRenderer'
import { getAssetUrl } from '../../utils/assets'

interface LessonNavProps {
  currentModuleId: string
  currentLessonId: string
}

export function LessonNav({ currentModuleId, currentLessonId }: LessonNavProps) {
  const { goToLesson, markCurrentComplete, isLessonCompleted } = useCourse()
  const prev = getPrevLesson(currentModuleId, currentLessonId)
  const next = getNextLesson(currentModuleId, currentLessonId)

  const module = COURSE_DATA.modules.find(m => m.id === currentModuleId)
  const lesson = module?.lessons.find(l => l.id === currentLessonId)
  const isEvaluation = lesson?.type === 'evaluation'
  const isCompleted = lesson ? isLessonCompleted(lesson.id) : false

  const handleNext = () => {
    markCurrentComplete()
    if (next) goToLesson(next.moduleId, next.id)
  }

  const handlePrev = () => {
    if (prev) goToLesson(prev.moduleId, prev.id)
  }

  return (
    <div className="flex items-center gap-4 py-4 px-4 md:px-6 border-t border-surface-border bg-surface-card/80 backdrop-blur-sm">
      <button
        onClick={handlePrev}
        disabled={!prev}
        className="btn-secondary flex items-center gap-2 text-sm"
        aria-label="Lección anterior"
      >
        <span aria-hidden="true">←</span>
        <span className="hidden sm:inline">Anterior</span>
      </button>

      <div className="flex-1">
        <GlobalProgressBar />
      </div>

      <button
        onClick={handleNext}
        disabled={!next || (isEvaluation && !isCompleted)}
        className="btn-primary flex items-center gap-2 text-sm"
        aria-label={next ? 'Siguiente lección' : 'Fin del curso'}
      >
        <span className="hidden sm:inline">
          {isEvaluation && !isCompleted ? 'Aprobar para continuar' : next ? 'Siguiente' : '¡Finalizar!'}
        </span>
        <span aria-hidden="true">{next ? '→' : '🏆'}</span>
      </button>
    </div>
  )
}

interface TopBarProps {
  currentModuleId: string
  currentLessonId: string
  onMenuToggle: () => void
}

export function TopBar({ currentModuleId, currentLessonId, onMenuToggle }: TopBarProps) {
  const module = COURSE_DATA.modules.find(m => m.id === currentModuleId)
  const lesson = module?.lessons.find(l => l.id === currentLessonId)

  const moduleIndex = COURSE_DATA.modules.findIndex(m => m.id === currentModuleId)
  const lessonIndex = module?.lessons.findIndex(l => l.id === currentLessonId) ?? 0

  return (
    <header className="flex items-center gap-4 px-4 md:px-6 py-3 border-b border-surface-border bg-surface-card/80 backdrop-blur-sm">
      {/* Mobile menu button */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-surface-elevated text-text-secondary"
        aria-label="Abrir menú de navegación"
        aria-expanded={false}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Breadcrumb */}
      <div className="flex-1 flex flex-col gap-0.5 min-w-0">
        <p className="text-xs text-text-muted truncate">
          {module?.icon} {module?.title} · Lección {lessonIndex + 1}/{module?.lessons.length ?? 0}
        </p>
        <p className="text-sm font-semibold text-text-primary truncate">
          {lesson?.title}
        </p>
      </div>

      {/* Mi Gusto logo */}
      <img
        src={getAssetUrl('/Logo Mi Gusto 2025.png')}
        alt="Mi Gusto Logo"
        className="h-8 w-auto object-contain flex-shrink-0"
      />
    </header>
  )
}
