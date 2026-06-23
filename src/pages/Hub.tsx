import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import { useCourse } from '../context/CourseContext'
import { usePageNavigate } from '../hooks/usePageNavigate'
import { getAssetUrl } from '../utils/assets'
import { TRAININGS, type Training } from '../data/trainings'
import { COURSES_DATA, getTotalLessons } from '../data/course'

const getColorClasses = (color: 'white' | 'red' | 'green' | 'yellow' | 'black' | 'blue', active: boolean) => {
  if (!active) {
    return {
      cardClass: 'bg-surface/30 border-surface-border/40 opacity-50 cursor-not-allowed',
      glowClass: '',
      circleStroke: 'stroke-surface-border/30',
      tagClass: 'text-text-muted bg-surface/30 border-surface-border/25',
      titleHoverClass: 'group-hover:text-text-primary'
    }
  }

  switch (color) {
    case 'white':
      return {
        cardClass: 'bg-surface-card hover:bg-surface-elevated border-slate-200/20 hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] cursor-pointer hover:-translate-y-1',
        glowClass: 'from-white/5',
        circleStroke: 'stroke-white',
        tagClass: 'text-white bg-white/10 border-white/20',
        titleHoverClass: 'group-hover:text-white'
      }
    case 'red':
      return {
        cardClass: 'bg-surface-card hover:bg-surface-elevated border-red-500/20 hover:border-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] cursor-pointer hover:-translate-y-1',
        glowClass: 'from-red-500/5',
        circleStroke: 'stroke-red-500',
        tagClass: 'text-red-300 bg-red-500/10 border-red-500/20',
        titleHoverClass: 'group-hover:text-red-400'
      }
    case 'green':
      return {
        cardClass: 'bg-surface-card hover:bg-surface-elevated border-emerald-500/20 hover:border-emerald-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] cursor-pointer hover:-translate-y-1',
        glowClass: 'from-emerald-500/5',
        circleStroke: 'stroke-emerald-500',
        tagClass: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
        titleHoverClass: 'group-hover:text-emerald-400'
      }
    case 'yellow':
      return {
        cardClass: 'bg-surface-card hover:bg-surface-elevated border-amber-500/20 hover:border-amber-500 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] cursor-pointer hover:-translate-y-1',
        glowClass: 'from-amber-500/5',
        circleStroke: 'stroke-amber-500',
        tagClass: 'text-amber-300 bg-amber-500/10 border-amber-500/20',
        titleHoverClass: 'group-hover:text-amber-400'
      }
    case 'black':
      return {
        cardClass: 'bg-surface-card hover:bg-surface-elevated border-slate-800 hover:border-slate-400 hover:shadow-[0_0_15px_rgba(148,163,184,0.1)] cursor-pointer hover:-translate-y-1',
        glowClass: 'from-slate-600/5',
        circleStroke: 'stroke-slate-400',
        tagClass: 'text-slate-300 bg-slate-800/40 border-slate-700',
        titleHoverClass: 'group-hover:text-slate-200'
      }
    case 'blue':
    default:
      return {
        cardClass: 'bg-surface-card hover:bg-surface-elevated border-blue-500/20 hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] cursor-pointer hover:-translate-y-1',
        glowClass: 'from-blue-500/5',
        circleStroke: 'stroke-blue-500',
        tagClass: 'text-blue-300 bg-blue-500/10 border-blue-500/20',
        titleHoverClass: 'group-hover:text-blue-400'
      }
  }
}

const LEGAJO_KEY = 'bpm-mi-gusto-legajo'

export function Hub() {
  const navigate = usePageNavigate()
  const { progress, setUserName, logout, updateUserName } = useCourse()
  const [showModal, setShowModal] = useState(false)
  const [inputName, setInputName] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const modalOverlayRef = useRef<HTMLDivElement>(null)
  const modalCardRef = useRef<HTMLDivElement>(null)

  // Profile edit modal
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [profileName, setProfileName] = useState('')
  const [profileLegajo, setProfileLegajo] = useState('')
  const [profileError, setProfileError] = useState('')
  const [legajo, setLegajo] = useState<string>(() => localStorage.getItem(LEGAJO_KEY) || '')
  const profileOverlayRef = useRef<HTMLDivElement>(null)
  const profileCardRef = useRef<HTMLDivElement>(null)

  const getGenderIcon = (fullName: string | null | undefined): string => {
    if (!fullName) return '🧑🏻'
    const firstName = fullName.trim().split(/\s+/)[0].toLowerCase()
    // Common exceptions: masculine names ending in 'a'
    const masculineExceptions = ['luca', 'matia', 'elija', 'josua', 'ezra', 'ilia']
    if (masculineExceptions.includes(firstName)) return '👨🏻'
    return firstName.endsWith('a') ? '👩🏻' : '👨🏻'
  }

  useEffect(() => {
    document.title = 'Mi Gusto | Capacitaciones'
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

  // Open profile modal and pre-fill fields
  const handleOpenProfile = () => {
    setProfileName(progress.userName || '')
    setProfileLegajo(legajo)
    setProfileError('')
    setShowProfileModal(true)
  }

  // Animate profile modal in
  useEffect(() => {
    if (!showProfileModal || !profileOverlayRef.current || !profileCardRef.current) return
    gsap.fromTo(profileOverlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' })
    gsap.fromTo(profileCardRef.current, { opacity: 0, scale: 0.92, y: 12 }, { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'back.out(1.4)' })
  }, [showProfileModal])

  const handleCloseProfile = () => {
    if (!profileOverlayRef.current || !profileCardRef.current) {
      setShowProfileModal(false)
      return
    }
    gsap.timeline({ onComplete: () => setShowProfileModal(false) })
      .to(profileCardRef.current, { opacity: 0, scale: 0.94, y: 8, duration: 0.2, ease: 'power2.in' })
      .to(profileOverlayRef.current, { opacity: 0, duration: 0.15 }, '-=0.05')
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedName = profileName.trim()
    const trimmedLegajo = profileLegajo.trim()
    if (!trimmedName || trimmedName.length < 4) {
      setProfileError('Ingresá tu nombre completo (mínimo 4 caracteres).')
      return
    }
    if (trimmedLegajo && !/^\d+$/.test(trimmedLegajo)) {
      setProfileError('El número de legajo debe contener solo dígitos.')
      return
    }

    try {
      // If user changed their name, update it in context / database
      if (progress.userName && trimmedName !== progress.userName) {
        await updateUserName(progress.userName, trimmedName)
      }
    } catch (err: any) {
      console.error(err)
      setProfileError('Ocurrió un error al actualizar el nombre. Reintentá.')
      return
    }

    // Save legajo to localStorage
    if (trimmedLegajo) {
      localStorage.setItem(LEGAJO_KEY, trimmedLegajo)
    } else {
      localStorage.removeItem(LEGAJO_KEY)
    }
    setLegajo(trimmedLegajo)
    setProfileError('')
    handleCloseProfile()
  }

  const handleModuleClick = (mod: Training) => {
    if (!mod.active) return
    
    if (progress.userName) {
      navigate(mod.id === 'calidad' ? '/calidad' : `/${mod.id}`)
    } else {
      setSelectedModuleId(mod.id)
      setShowModal(true)
    }
  }

  const handleSubmitName = async (e: React.FormEvent) => {
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
    setSubmitting(true)
    setErrorMsg('')
    try {
      await setUserName(trimmed, selectedModuleId || 'calidad')
      setShowModal(false)
      const targetPath = selectedModuleId === 'calidad' ? '/calidad' : `/${selectedModuleId || 'calidad'}`
      navigate(targetPath)
    } catch (err: any) {
      console.error(err)
      if (err.message === 'ALREADY_REGISTERED') {
        setErrorMsg('Trabajador ya registrado previamente, contacte el supervisor para solicitar una revision')
      } else {
        setErrorMsg('Ocurrió un error al verificar tu estado. Reintentá.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  const getTrainingProgressPercent = (trainingId: string) => {
    try {
      const saved = localStorage.getItem(`bpm-mi-gusto-progress_${trainingId}`)
      if (!saved) return 0
      const parsed = JSON.parse(saved)
      const courseDataObj = COURSES_DATA[trainingId]
      if (!courseDataObj) return 0
      const total = getTotalLessons(courseDataObj)
      const completed = parsed.completedLessons?.length || 0
      return Math.round((completed / total) * 100)
    } catch {
      return 0
    }
  }

  return (
    <div ref={containerRef} className="min-h-dvh bg-gradient-dark flex flex-col justify-between text-text-primary px-4 py-8 md:px-8">
      <header className="w-full max-w-6xl mx-auto flex justify-between items-center mb-10">
        <div className="flex items-center gap-3">
          <img
            src={getAssetUrl('/Logo Mi Gusto 2025.png')}
            alt="Mi Gusto Logo"
            className="h-10 w-auto object-contain hub-logo opacity-0"
          />
        </div>
        {progress.userName ? (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2.5 bg-white/5 border border-slate-500/20 px-3.5 py-2 rounded-lg">
              <span className="text-xs font-bold text-brand-300">{getGenderIcon(progress.userName)} {progress.userName}</span>
            </div>
            <button
              onClick={handleOpenProfile}
              title="Editar perfil"
              className="p-2 bg-white/5 hover:bg-white/10 border border-slate-500/20 hover:border-slate-400/40 rounded-lg transition-all text-text-muted hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ) : (
          <div />
        )}
      </header>

      {/* Main Content */}
      <main className="w-full max-w-5xl mx-auto flex-1 flex flex-col justify-center items-center">
        <div className="text-center mb-6 sm:mb-12 hub-header-text opacity-0">
          <span className="text-brand-400 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest bg-white/5 border border-slate-500/20 px-3 py-1 rounded-full">
            Plataforma de Capacitaciones
          </span>
          <h1 className="text-2xl sm:text-fluid-4xl font-black mt-3 sm:mt-4 leading-tight">
            Portal de Formación <span className="gradient-text">Fábrica</span>
          </h1>
          <p className="text-text-secondary mt-2 sm:mt-3 max-w-lg mx-auto text-xs sm:text-base hidden sm:block">
            Seleccioná la capacitación asignada para registrarte e iniciar tu entrenamiento obligatorio.
          </p>
        </div>

        {/* 2x3 Button Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 w-full max-w-5xl">
          {TRAININGS.map((mod) => {
            const percent = getTrainingProgressPercent(mod.id)
            const { cardClass, glowClass, circleStroke, tagClass, titleHoverClass } = getColorClasses(mod.themeColor, mod.active)
            return (
              <button
                key={mod.id}
                onClick={() => handleModuleClick(mod)}
                disabled={!mod.active}
                className={`hub-card opacity-0 text-left rounded-2xl border p-3.5 sm:p-6 flex flex-col justify-between h-40 sm:h-56 transition-all duration-300 relative group overflow-hidden ${cardClass}`}
              >
                {/* Card glowing backdrop for active card */}
                {mod.active && (
                  <div className={`absolute inset-0 bg-gradient-to-br ${glowClass} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                )}

                <div className="flex justify-between items-start w-full relative z-10">
                  <span className="text-2xl sm:text-4xl bg-surface/50 p-1.5 sm:p-2.5 rounded-xl border border-surface-border/30">
                    {mod.icon}
                  </span>
                  {mod.active && progress.userName ? (
                    <div className="relative w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0" title={`Progreso: ${percent}%`}>
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 48 48">
                        {/* Fondo del círculo */}
                        <circle
                          cx="24"
                          cy="24"
                          r="19"
                          className="stroke-surface-border/40 fill-none"
                          strokeWidth="3.5"
                        />
                        {/* Progreso del círculo */}
                        <circle
                          cx="24"
                          cy="24"
                          r="19"
                          className={`${circleStroke} fill-none transition-all duration-700 ease-out`}
                          strokeWidth="3.5"
                          strokeDasharray={2 * Math.PI * 19}
                          strokeDashoffset={2 * Math.PI * 19 * (1 - percent / 100)}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute text-[8px] sm:text-[10px] font-black text-white">
                        {percent}%
                      </span>
                    </div>
                  ) : (
                    <span className={`text-[8px] sm:text-[10px] font-bold uppercase tracking-wider px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full border ${tagClass}`}>
                      {mod.active ? mod.tagline : 'Próx.'}
                    </span>
                  )}
                </div>

                <div className="mt-2 sm:mt-4 relative z-10">
                  <h3 className={`text-xs sm:text-fluid-lg font-bold text-text-primary ${titleHoverClass} transition-colors leading-tight`}>
                    {mod.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-text-secondary mt-1 sm:mt-1.5 leading-relaxed line-clamp-2">
                    {mod.description}
                  </p>
                </div>

                {/* Padlock icon for disabled ones */}
                {!mod.active && (
                  <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 text-text-muted text-sm sm:text-base">
                    🔒
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center mt-12 py-4 border-t border-surface-border/30 max-w-6xl mx-auto">
        <p className="text-xs text-text-muted">Desarrollado por el Departamento de sistemas de Mi Gusto</p>
      </footer>

      {/* Profile Edit Modal */}
      {showProfileModal && createPortal(
        <div
          ref={profileOverlayRef}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) handleCloseProfile() }}
        >
          <div
            ref={profileCardRef}
            className="bg-surface-card border border-surface-border rounded-2xl w-full max-w-md p-6 shadow-glow relative"
          >
            <button
              onClick={handleCloseProfile}
              className="absolute top-4 right-4 text-text-muted hover:text-white transition-colors text-lg leading-none"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-brand-400" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Editar Perfil</h3>
                <p className="text-xs text-text-muted">Actualizá tus datos de identificación</p>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                  Nombre y Apellido
                </label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => { setProfileName(e.target.value); setProfileError('') }}
                  placeholder="Ej: Juan García"
                  className="w-full bg-surface border border-surface-border focus:border-brand-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                  Número de Legajo
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={profileLegajo}
                  onChange={(e) => { setProfileLegajo(e.target.value); setProfileError('') }}
                  placeholder="Ej: 00142"
                  autoFocus
                  className="w-full bg-surface border border-surface-border focus:border-brand-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                />
              </div>

              {profileError && (
                <p className="text-red-400 text-xs font-medium bg-red-500/10 border border-red-500/20 px-3 py-2.5 rounded-lg">⚠️ {profileError}</p>
              )}

              <div className="flex justify-end gap-3 mt-1">
                <button
                  type="submit"
                  className="btn-primary py-3 px-6 text-xs font-bold shadow-glow w-auto"
                >
                  Guardar Cambios ✓
                </button>
                <button
                  type="button"
                  onClick={handleCloseProfile}
                  className="bg-surface border border-surface-border hover:bg-surface-elevated text-text-secondary hover:text-white py-3 px-6 rounded-xl text-xs font-bold transition-all w-auto"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* Name Input Modal */}
      {showModal && createPortal(
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
                  disabled={submitting}
                  className="btn-primary px-8 py-3.5 text-sm font-bold shadow-glow flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Verificando datos... 🔄' : 'Comenzar Capacitación 🚀'}
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
