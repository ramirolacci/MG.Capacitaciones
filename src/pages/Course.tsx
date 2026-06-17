import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePageNavigate } from '../hooks/usePageNavigate'
import gsap from 'gsap'
import { useCourse } from '../context/CourseContext'
import { COURSE_DATA } from '../data/course'
import { LessonRenderer } from '../components/course/LessonRenderer'
import { Sidebar } from '../components/layout/Sidebar'
import { LessonNav, TopBar } from '../components/layout/LessonNav'

export function Course() {
  const { progress, isEvaluationActive } = useCourse()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const prevKey = useRef('')
  const navigate = usePageNavigate()   // user-triggered nav
  const guardNavigate = useNavigate()   // guard redirect

  // Resolve current module and lesson
  const module = COURSE_DATA.modules.find(m => m.id === progress.currentModuleId)
  const lesson = module?.lessons.find(l => l.id === progress.currentLessonId)

  // If no valid state found, redirect to landing
  useEffect(() => {
    if (!module || !lesson) guardNavigate('/')
  }, [module, lesson, guardNavigate])

  // Slide transition animation when lesson changes
  const lessonKey = `${progress.currentModuleId}-${progress.currentLessonId}`
  useEffect(() => {
    if (!contentRef.current || prevKey.current === lessonKey) return
    prevKey.current = lessonKey

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
    )
  }, [lessonKey])

  if (!module || !lesson) return null

  return (
    <div className="flex h-dvh overflow-hidden bg-surface">
      {/* Sidebar */}
      {!isEvaluationActive && (
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        {!isEvaluationActive && (
          <TopBar
            currentModuleId={progress.currentModuleId}
            currentLessonId={progress.currentLessonId}
            onMenuToggle={() => setIsSidebarOpen(prev => !prev)}
          />
        )}

        {/* Lesson content — scrollable */}
        <div
          ref={contentRef}
          className={`flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-10 lg:px-12 ${
            isEvaluationActive ? 'flex items-center justify-center' : ''
          }`}
        >
          <div className={isEvaluationActive ? 'w-full max-w-3xl' : 'max-w-6xl mx-auto'}>
            <LessonRenderer lesson={lesson} module={module} />
          </div>
        </div>

        {/* Nav bar */}
        {!isEvaluationActive && (
          <LessonNav
            currentModuleId={progress.currentModuleId}
            currentLessonId={progress.currentLessonId}
          />
        )}
      </div>
    </div>
  )
}
