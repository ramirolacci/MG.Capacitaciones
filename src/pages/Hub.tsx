import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useCourse } from '../context/CourseContext'
import { usePageNavigate } from '../hooks/usePageNavigate'

interface TrainingModule {
  id: string
  title: string
  icon: string
  active: boolean
  tagline: string
  description: string
}

const MODULES: TrainingModule[] = [
  {
    id: 'calidad',
    title: 'Calidad (BPM)',
    icon: '🛡️',
    active: true,
    tagline: 'Obligatorio y Disponible',
    description: 'Buenas Prácticas de Manufactura en elaboración de alimentos.',
  },
  {
    id: 'seguridad',
    title: 'Seguridad e Higiene',
    icon: '🦺',
    active: false,
    tagline: 'Próximamente',
    description: 'Prevención de riesgos laborales y uso de elementos de protección.',
  },
  {
    id: 'operaciones',
    title: 'Operaciones de Planta',
    icon: '⚙️',
    active: false,
    tagline: 'Próximamente',
    description: 'Uso eficiente de maquinarias, hornos y equipos productivos.',
  },
  {
    id: 'logistica',
    title: 'Logística y Despacho',
    icon: '📦',
    active: false,
    tagline: 'Próximamente',
    description: 'Preparación de pedidos, almacenamiento y cadena de frío.',
  },
  {
    id: 'atencion',
    title: 'Atención al Cliente',
    icon: '🤝',
    active: false,
    tagline: 'Próximamente',
    description: 'Estándares de servicio en sucursales y experiencia de marca.',
  },
  {
    id: 'mantenimiento',
    title: 'Mantenimiento Preventivo',
    icon: '🔧',
    active: false,
    tagline: 'Próximamente',
    description: 'Limpieza técnica, calibración y conservación de activos.',
  },
]

export function Hub() {
  const navigate = usePageNavigate()
  const { progress, setUserName, logout } = useCourse()
  const [showModal, setShowModal] = useState(false)
  const [inputName, setInputName] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const modalOverlayRef = useRef<HTMLDivElement>(null)
  const modalCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const ctx = gsap.context(() => {
      gsap.timeline()
        .fromTo('.hub-logo', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.2)' })
        .fromTo('.hub-header-text', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.3')
        .fromTo('.hub-card', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' }, '-=0.2')
    }, containerRef)
    return () => ctx.revert()
  }, [])

  // Animate modal IN when showModal becomes true
  useEffect(() => {
    if (!showModal || !modalOverlayRef.current || !modalCardRef.current) return
    gsap.fromTo(
      modalOverlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.25, ease: 'power2.out' }
    )
    gsap.fromTo(
      modalCardRef.current,
      { opacity: 0, scale: 0.92, y: 12 },
      { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'back.out(1.4)' }
    )
  }, [showModal])

  const handleCloseModal = () => {
    if (!modalOverlayRef.current || !modalCardRef.current) {
      setShowModal(false)
      setErrorMsg('')
      return
    }
    const tl = gsap.timeline({
      onComplete: () => {
        setShowModal(false)
        setErrorMsg('')
      },
    })
    tl.to(modalCardRef.current, { opacity: 0, scale: 0.94, y: 8, duration: 0.2, ease: 'power2.in' })
      .to(modalOverlayRef.current, { opacity: 0, duration: 0.15, ease: 'power1.in' }, '-=0.05')
  }

  const handleModuleClick = (mod: TrainingModule) => {
    if (!mod.active) return
    
    if (progress.userName) {
      navigate('/calidad')
    } else {
      setShowModal(true)
    }
  }

  const handleSubmitName = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = inputName.trim()
    if (!trimmed) {
      setErrorMsg('Por favor, ingresá tu nombre y apellido para comenzar.')
      return
    }
    if (trimmed.length < 4) {
      setErrorMsg('Ingresá tu nombre completo (mínimo 4 caracteres).')
      return
    }
    setUserName(trimmed)
    setShowModal(false)
    navigate('/calidad')
  }

  return (
    <div ref={containerRef} className="min-h-dvh bg-gradient-dark flex flex-col justify-between text-text-primary px-4 py-8 md:px-8">
      {/* Top action bar */}
      <header className="w-full max-w-6xl mx-auto flex justify-between items-center mb-10">
        <div className="flex items-center gap-3">
          <img
            src="/Logo Mi Gusto 2025.png"
            alt="Mi Gusto Logo"
            className="h-10 w-auto object-contain hub-logo opacity-0"
          />
        </div>
        <button
          onClick={() => navigate('/admin')}
          className="text-xs text-text-muted hover:text-brand-400 bg-surface-card hover:bg-surface-elevated border border-surface-border px-3.5 py-2 rounded-lg transition-all"
        >
          🔑 Panel de Supervisor
        </button>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-5xl mx-auto flex-1 flex flex-col justify-center items-center">
        <div className="text-center mb-12 hub-header-text opacity-0">
          <span className="text-brand-400 text-xs font-extrabold uppercase tracking-widest bg-brand-600/10 border border-brand-600/20 px-3 py-1 rounded-full">
            Plataforma de Capacitaciones
          </span>
          <h1 className="text-fluid-4xl font-black mt-4 leading-tight">
            Portal de Formación <span className="gradient-text">Fábrica</span>
          </h1>
          <p className="text-text-secondary mt-3 max-w-lg mx-auto text-sm md:text-base">
            Seleccioná la capacitación asignada para registrarte e iniciar tu entrenamiento obligatorio.
          </p>
        </div>

        {/* Active Session Info */}
        {progress.userName && (
          <div className="w-full max-w-3xl mb-6 bg-brand-600/10 border border-brand-600/30 rounded-xl px-5 py-3 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="flex items-center gap-3 text-left">
              <span className="text-xl">👤</span>
              <div>
                <p className="text-xs text-brand-300 font-semibold uppercase tracking-wider">Sesión Activa</p>
                <h4 className="text-sm font-bold text-white">{progress.userName}</h4>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/calidad')}
                className="text-xs font-bold text-white bg-brand-600 hover:bg-brand-500 px-4 py-2 rounded-lg transition-colors"
              >
                Continuar
              </button>
              <button
                onClick={logout}
                className="text-xs text-red-300 hover:bg-red-500/15 border border-red-500/30 px-3 py-2 rounded-lg transition-colors"
              >
                Salir
              </button>
            </div>
          </div>
        )}

        {/* 2x3 Button Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          {MODULES.map((mod) => (
            <button
              key={mod.id}
              onClick={() => handleModuleClick(mod)}
              disabled={!mod.active}
              className={`hub-card opacity-0 text-left rounded-2xl border p-6 flex flex-col justify-between h-56 transition-all duration-300 relative group overflow-hidden ${
                mod.active
                  ? 'bg-surface-card hover:bg-surface-elevated border-brand-600/40 hover:border-brand-500 hover:shadow-glow cursor-pointer hover:-translate-y-1'
                  : 'bg-surface/30 border-surface-border/40 opacity-50 cursor-not-allowed'
              }`}
            >
              {/* Card glowing backdrop for active card */}
              {mod.active && (
                <div className="absolute inset-0 bg-gradient-to-br from-brand-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}

              <div className="flex justify-between items-start w-full relative z-10">
                <span className="text-4xl bg-surface/50 p-2.5 rounded-xl border border-surface-border/30">
                  {mod.icon}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                    mod.active
                      ? 'text-brand-300 bg-brand-500/10 border-brand-500/20'
                      : 'text-text-muted bg-surface/30 border-surface-border/25'
                  }`}
                >
                  {mod.tagline}
                </span>
              </div>

              <div className="mt-4 relative z-10">
                <h3 className="text-fluid-lg font-bold text-text-primary group-hover:text-brand-400 transition-colors">
                  {mod.title}
                </h3>
                <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">
                  {mod.description}
                </p>
              </div>

              {/* Padlock icon for disabled ones */}
              {!mod.active && (
                <div className="absolute bottom-4 right-4 text-text-muted">
                  🔒
                </div>
              )}
            </button>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center mt-12 py-4 border-t border-surface-border/30 max-w-6xl mx-auto">
        <p className="text-xs text-text-muted">Desarrollado por el Departamento de sistemas de Mi Gusto 🥟</p>
      </footer>

      {/* Name Input Modal */}
      {showModal && (
        <div
          ref={modalOverlayRef}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            ref={modalCardRef}
            className="bg-surface-card border border-surface-border rounded-2xl w-full max-w-md p-6 shadow-glow relative"
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-text-muted hover:text-white transition-colors"
            >
              ✕
            </button>
            <h3 className="text-fluid-xl font-bold text-white mb-2">Registro del colaborador</h3>
            <p className="text-xs text-text-secondary mb-5 leading-relaxed">
              Ingresá tu nombre y apellido completo para registrar tu participación. El supervisor monitoreará los resultados en el panel administrativo.
            </p>
            <form onSubmit={handleSubmitName} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                  Nombre y Apellido
                </label>
                <input
                  type="text"
                  value={inputName}
                  onChange={(e) => {
                    setInputName(e.target.value)
                    setErrorMsg('')
                  }}
                  placeholder="Ingresar nombre y apellido"
                  autoFocus
                  className="w-full bg-surface border border-surface-border focus:border-brand-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                />
                {errorMsg && (
                  <p className="text-red-400 text-xs mt-2 font-medium">⚠️ {errorMsg}</p>
                )}
              </div>
              <div className="flex justify-center mt-2">
                <button
                  type="submit"
                  className="btn-primary px-8 py-3.5 text-sm font-bold shadow-glow flex items-center gap-2"
                >
                  Comenzar Capacitación 🚀
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
