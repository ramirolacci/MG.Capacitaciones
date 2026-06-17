import type { Lesson, Module } from '../../data/types'
import { HeroSlide } from '../slides/HeroSlide'
import { BulletListSlide } from '../slides/BulletListSlide'
import { CompareSlide } from '../slides/CompareSlide'
import { AlertSlide } from '../slides/AlertSlide'
import { StepsSlide } from '../slides/StepsSlide'
import { QuoteSlide } from '../slides/QuoteSlide'
import { ModuleHero } from '../slides/ModuleHero'
import { CommitmentSlide, ClosingSlide } from '../slides/ClosingSlides'
import { EvaluationSlide } from '../slides/EvaluationSlide'
import { useCourse } from '../../context/CourseContext'
import { COURSE_DATA } from '../../data/course'

interface LessonRendererProps {
  lesson: Lesson
  module: Module
}

export function LessonRenderer({ lesson, module }: LessonRendererProps) {
  const { resetProgress } = useCourse()

  switch (lesson.type) {
    case 'hero':
      return <HeroSlide content={lesson.content} />
    case 'bullet-list':
      return <BulletListSlide content={lesson.content} />
    case 'compare':
      return <CompareSlide content={lesson.content} />
    case 'alert':
      return <AlertSlide content={lesson.content} />
    case 'steps':
      return <StepsSlide content={lesson.content} />
    case 'quote':
      return <QuoteSlide content={lesson.content} />
    case 'module-hero':
      return <ModuleHero content={lesson.content} module={module} />
    case 'commitment':
      return <CommitmentSlide content={lesson.content} />
    case 'closing':
      return <ClosingSlide content={lesson.content} onRestart={resetProgress} />
    case 'evaluation':
      return <EvaluationSlide />
    default:
      return (
        <div className="flex flex-col gap-4 text-center py-12">
          <p className="text-text-muted">Tipo de slide desconocido</p>
          <pre className="text-xs text-text-muted bg-surface-card p-4 rounded-xl">
            {JSON.stringify(lesson, null, 2)}
          </pre>
        </div>
      )
  }
}

// ── Barra de progreso global ──────────────────────────────────────────────────
export function GlobalProgressBar() {
  const { percentComplete, completedCount, totalLessons } = useCourse()
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1.5 bg-surface-elevated rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-600 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percentComplete}%` }}
          role="progressbar"
          aria-valuenow={percentComplete}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progreso del curso"
        />
      </div>
      <span className="text-xs text-text-muted whitespace-nowrap font-medium">
        {completedCount}/{totalLessons}
      </span>
    </div>
  )
}

// ── Indicador de progreso por módulo ─────────────────────────────────────────
export function ModuleProgressDots() {
  const { progress, isLessonCompleted } = useCourse()

  return (
    <div className="flex flex-col gap-4">
      {COURSE_DATA.modules.map(mod => {
        const completed = mod.lessons.filter(l => isLessonCompleted(l.id)).length
        const total = mod.lessons.length
        const pct = (completed / total) * 100
        const isCurrent = mod.id === progress.currentModuleId

        return (
          <div key={mod.id} className={`flex flex-col gap-1 ${isCurrent ? 'opacity-100' : 'opacity-60'}`}>
            <div className="flex justify-between text-xs">
              <span className={`font-medium ${isCurrent ? 'text-brand-400' : 'text-text-muted'}`}>
                {mod.icon} {mod.title}
              </span>
              <span className="text-text-muted">{completed}/{total}</span>
            </div>
            <div className="h-1 bg-surface-elevated rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-600 rounded-full transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
