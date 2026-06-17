import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { COURSE_DATA } from '../data/course'
import { useCourse } from '../context/CourseContext'

const MODULE_COLORS: Record<string, string> = {
  intro: 'border-brand-600/40 bg-brand-600/10',
  personal: 'border-blue-500/40 bg-blue-500/10',
  instalaciones: 'border-amber-500/40 bg-amber-500/10',
  operaciones: 'border-purple-500/40 bg-purple-500/10',
  cierre: 'border-brand-600/40 bg-brand-600/10',
}
const MODULE_TEXT: Record<string, string> = {
  intro: 'text-brand-400',
  personal: 'text-blue-400',
  instalaciones: 'text-amber-400',
  operaciones: 'text-purple-400',
  cierre: 'text-brand-400',
}

export function Landing() {
  const navigate = useNavigate()
  const { progress } = useCourse()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!progress.userName) {
      navigate('/', { replace: true })
    }
  }, [progress.userName, navigate])

  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.timeline()
        .fromTo('.hero-badge', { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5 })
        .fromTo('.hero-title', { opacity: 0, y: 40, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' }, '-=0.2')
        .fromTo('.hero-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
        .fromTo('.hero-cta', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
        .fromTo('.hero-objectives', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, '-=0.2')
        .fromTo('.module-card', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, '-=0.3')
    }, ref)
    return () => ctx.revert()
  }, [])

  const handleStart = () => {
    navigate('/curso')
  }

  const totalLessons = COURSE_DATA.modules.reduce((a, m) => a + m.lessons.length, 0)
  const hasProgress = progress.completedLessons.length > 0

  return (
    <div ref={ref} className="min-h-dvh bg-gradient-dark flex flex-col">
      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 md:py-24 text-center max-w-5xl mx-auto w-full">
        <div className="hero-badge opacity-0 inline-flex items-center gap-2 bg-brand-600/20 border border-brand-600/30 rounded-full px-4 py-1.5 mb-8">
          <span className="text-brand-400 text-xs font-bold uppercase tracking-widest">Mi Gusto · Capacitación obligatoria</span>
        </div>

        <h1 className="hero-title opacity-0 text-fluid-5xl font-extrabold text-text-primary leading-tight text-balance max-w-3xl mx-auto mb-6">
          Buenas Prácticas de{' '}
          <span className="gradient-text">Manufactura</span>
        </h1>

        <p className="hero-sub opacity-0 text-fluid-lg text-text-secondary max-w-xl mx-auto mb-10 leading-relaxed">
          Garantizamos la elaboración de alimentos seguros para el consumidor mediante el control del personal, las instalaciones y las operaciones.
        </p>

        {/* CTA */}
        <div className="hero-cta opacity-0 flex flex-col sm:flex-row items-center gap-4 mb-12">
          <button
            id="btn-start-course"
            onClick={handleStart}
            className="btn-primary text-base px-8 py-4 shadow-glow flex items-center gap-2"
          >
            {hasProgress ? '▶ Continuar capacitación' : '🚀 Comenzar capacitación'}
          </button>
          {hasProgress && (
            <p className="text-text-muted text-sm">
              Tenés {progress.completedLessons.length} de {totalLessons} lecciones completadas
            </p>
          )}
        </div>

        {/* Objectives */}
        <div className="hero-objectives opacity-0 flex flex-col sm:flex-row gap-4 mb-16 w-full max-w-3xl">
          {COURSE_DATA.objectives.map((obj, i) => (
            <div
              key={i}
              className="hero-objectives flex-1 bg-surface-card border border-surface-border rounded-xl px-5 py-4 text-left"
            >
              <span className="text-xl mb-2 block" aria-hidden="true">
                {['🎯', '🛡️', '⚖️'][i]}
              </span>
              <p className="text-sm text-text-secondary leading-snug">{obj}</p>
            </div>
          ))}
        </div>

        {/* Module grid */}
        <div className="w-full max-w-3xl">
          <h2 className="text-fluid-xl font-bold text-text-primary mb-6">Contenido del curso</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {COURSE_DATA.modules.map(mod => (
              <div
                key={mod.id}
                className={`module-card opacity-0 border rounded-2xl p-5 text-left ${MODULE_COLORS[mod.id] ?? 'border-surface-border bg-surface-card'}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl" aria-hidden="true">{mod.icon}</span>
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-wider">Bloque {mod.number}</p>
                    <h3 className={`font-bold text-fluid-base ${MODULE_TEXT[mod.id] ?? 'text-text-primary'}`}>
                      {mod.title}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-text-secondary leading-snug mb-3">{mod.description}</p>
                <p className="text-xs text-text-muted">{mod.lessons.length} lecciones</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-surface-border py-5 text-center">
        <p className="text-xs text-text-muted">© 2026 Mi Gusto · Todos los derechos reservados</p>
      </footer>
    </div>
  )
}
