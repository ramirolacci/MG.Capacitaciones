import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import type { LessonContent } from '../../data/types'

interface CommitmentSlideProps { content: LessonContent }

export function CommitmentSlide({ content }: CommitmentSlideProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.timeline()
        .fromTo('.cm-bg', { opacity: 0 }, { opacity: 1, duration: 0.5 })
        .fromTo('.cm-content', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out' }, '-=0.2')
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className="flex flex-col items-center justify-center text-center gap-8 py-6 w-full">
      <div className="cm-bg opacity-0 w-20 h-20 rounded-full bg-gradient-brand flex items-center justify-center shadow-glow text-4xl">
        🤝
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="cm-content opacity-0 text-fluid-4xl font-extrabold text-text-primary">
          {content.title}
        </h2>
        {content.quote && (
          <div className="cm-content opacity-0 bg-surface-card border border-brand-600/30 rounded-2xl p-6 md:p-8 max-w-2xl mx-auto">
            <blockquote className="text-fluid-xl text-white font-medium leading-relaxed italic">
              {content.quote}
            </blockquote>
          </div>
        )}
        {content.description && (
          <p className="cm-content opacity-0 lesson-description max-w-lg mx-auto">
            {content.description}
          </p>
        )}
      </div>
    </div>
  )
}

interface ClosingSlideProps { content: LessonContent; onRestart?: () => void }

export function ClosingSlide({ content, onRestart }: ClosingSlideProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.timeline()
        .fromTo('.cl-star', { scale: 0, rotation: -180 }, { scale: 1, rotation: 0, duration: 0.7, ease: 'back.out(1.7)' })
        .fromTo('.cl-text', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out' }, '-=0.3')
        .fromTo('.cl-btn', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.1')
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className="flex flex-col items-center justify-center text-center gap-8 py-8 w-full">
      <div className="cl-star text-7xl">🏆</div>

      <div className="flex flex-col gap-3">
        <div className="cl-text opacity-0 flex flex-col items-center gap-2 mb-2">
          <img
            src="/Logo Mi Gusto 2025.png"
            alt="Mi Gusto Logo"
            className="h-10 w-auto object-contain"
          />
          <p className="text-brand-400 text-xs font-semibold tracking-widest uppercase mt-1">
            BPM
          </p>
        </div>
        <h2 className="cl-text opacity-0 text-fluid-4xl font-extrabold text-text-primary">
          {content.title}
        </h2>
        <p className="cl-text opacity-0 text-fluid-2xl font-semibold text-brand-400">
          {content.subtitle}
        </p>
        {content.description && (
          <p className="cl-text opacity-0 lesson-description max-w-md mx-auto mt-2">
            {content.description}
          </p>
        )}
      </div>

      {/* Completion badge */}
      <div className="cl-text opacity-0 flex items-center gap-3 bg-brand-600/20 border border-brand-600/40 rounded-full px-6 py-3">
        <span className="text-xl">✅</span>
        <span className="text-brand-400 font-semibold text-sm">Capacitación completada</span>
      </div>

      {onRestart && (
        <button
          onClick={onRestart}
          className="cl-btn opacity-0 btn-secondary text-sm"
        >
          🔄 Volver a comenzar
        </button>
      )}
    </div>
  )
}
