import { useState, useEffect } from 'react'
import { useCourse } from '../../context/CourseContext'
import { useGSAPEntrance } from '../../hooks/useGSAPEntrance'
import { getFlatLessons, COURSE_DATA } from '../../data/course'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number // 0-indexed (0=A, 1=B, 2=C, 3=D)
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Las Buenas Prácticas de Manufactura tienen como finalidad principal:",
    options: [
      "A) Estandarizar los procesos productivos para mejorar la eficiencia.",
      "B) Garantizar que los alimentos sean producidos bajo condiciones que minimicen riesgos para la salud del consumidor.",
      "C) Reducir los costos asociados a reclamos y devoluciones.",
      "D) Mejorar la calidad organoléptica de los productos elaborados."
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "Respecto a la higiene personal, puede afirmarse que:",
    options: [
      "A) Constituye una medida complementaria a los controles operacionales.",
      "B) Es importante únicamente en las etapas finales de elaboración.",
      "C) Es una de las barreras fundamentales para prevenir la contaminación de los alimentos.",
      "D) Tiene impacto solamente cuando existe contacto directo con el producto."
    ],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "El uso de elementos personales en áreas productivas se encuentra restringido porque:",
    options: [
      "A) Puede interferir con la correcta ejecución de las tareas.",
      "B) Dificulta la limpieza y desinfección de las instalaciones.",
      "C) Incrementa la probabilidad de contaminación física del producto.",
      "D) Genera incumplimientos relacionados con la imagen corporativa."
    ],
    correctAnswer: 2
  },
  {
    id: 4,
    question: "Una instalación diseñada bajo criterios de BPM debe:",
    options: [
      "A) Facilitar la circulación del personal y materiales minimizando riesgos de contaminación.",
      "B) Priorizar la utilización eficiente del espacio disponible.",
      "C) Permitir la máxima capacidad productiva posible.",
      "D) Adaptarse a las necesidades operativas de cada turno."
    ],
    correctAnswer: 0
  },
  {
    id: 5,
    question: "La correcta identificación de materias primas y productos tiene como principal objetivo:",
    options: [
      "A) Optimizar la gestión del almacén.",
      "B) Facilitar el control de inventarios.",
      "C) Garantizar la trazabilidad y evitar errores operativos.",
      "D) Mejorar la organización visual de los sectores."
    ],
    correctAnswer: 2
  },
  {
    id: 6,
    question: "El lavado de manos se considera una medida crítica porque:",
    options: [
      "A) Reduce la presencia de contaminantes que pueden transferirse al alimento.",
      "B) Disminuye el desgaste de los guantes.",
      "C) Permite mantener una mejor presentación personal.",
      "D) Favorece el cumplimiento de los procedimientos de ingreso."
    ],
    correctAnswer: 0
  },
  {
    id: 7,
    question: "La presencia de condensación en áreas de producción representa un riesgo debido a que:",
    options: [
      "A) Puede afectar la temperatura ambiente.",
      "B) Puede favorecer la transferencia de contaminantes hacia el producto.",
      "C) Incrementa los tiempos de limpieza.",
      "D) Reduce la eficiencia de los equipos."
    ],
    correctAnswer: 1
  },
  {
    id: 8,
    question: "Los programas de limpieza y desinfección tienen como propósito:",
    options: [
      "A) Mantener el orden visual de la planta.",
      "B) Asegurar condiciones adecuadas para prevenir fuentes de contaminación.",
      "C) Reducir el desgaste de los equipos.",
      "D) Mejorar la productividad de los sectores."
    ],
    correctAnswer: 1
  },
  {
    id: 9,
    question: "Una desviación en el cumplimiento de BPM puede provocar:",
    options: [
      "A) Incremento de costos operativos.",
      "B) Retrasos en la producción.",
      "C) Pérdida de la inocuidad del alimento.",
      "D) Disminución de la eficiencia del proceso."
    ],
    correctAnswer: 2
  },
  {
    id: 10,
    question: "La responsabilidad sobre el cumplimiento de BPM corresponde:",
    options: [
      "A) Al departamento de Calidad.",
      "B) A supervisores y jefaturas.",
      "C) Al personal que manipula alimentos.",
      "D) A toda persona que participe en actividades relacionadas con el producto."
    ],
    correctAnswer: 3
  },
  {
    id: 11,
    question: "La capacitación en BPM es necesaria porque:",
    options: [
      "A) Permite cumplir requisitos normativos.",
      "B) Facilita la estandarización de tareas.",
      "C) Contribuye a que el personal comprenda y aplique prácticas que protejan la inocuidad.",
      "D) Mejora el desempeño general de la organización."
    ],
    correctAnswer: 2
  },
  {
    id: 12,
    question: "Una correcta gestión de residuos busca principalmente:",
    options: [
      "A) Mantener la planta ordenada.",
      "B) Evitar la generación de focos de contaminación y atracción de plagas.",
      "C) Reducir el volumen de desperdicios.",
      "D) Optimizar los tiempos de limpieza."
    ],
    correctAnswer: 1
  },
  {
    id: 13,
    question: "El concepto de contaminación cruzada se relaciona con:",
    options: [
      "A) La mezcla accidental de diferentes lotes.",
      "B) La transferencia de contaminantes entre personas, superficies, equipos o alimentos.",
      "C) El uso simultáneo de distintas materias primas.",
      "D) El almacenamiento compartido de materiales."
    ],
    correctAnswer: 1
  },
  {
    id: 14,
    question: "La trazabilidad dentro de un sistema BPM permite:",
    options: [
      "A) Conocer el rendimiento de cada línea.",
      "B) Reconstruir la historia y recorrido de un producto.",
      "C) Mejorar la gestión de compras.",
      "D) Optimizar la planificación de la producción."
    ],
    correctAnswer: 1
  },
  {
    id: 15,
    question: "La aplicación efectiva de BPM puede considerarse:",
    options: [
      "A) Un requisito documental.",
      "B) Una herramienta preventiva para proteger al consumidor.",
      "C) Un mecanismo para reducir costos.",
      "D) Un sistema de control exclusivo del producto terminado."
    ],
    correctAnswer: 1
  }
]

export function EvaluationSlide() {
  const { progress, markCurrentComplete, isLessonCompleted, setIsEvaluationActive, setEvaluationResult, goToLesson } = useCourse()
  const containerRef = useGSAPEntrance({ y: 20, duration: 0.5 })

  const flat = getFlatLessons()
  const requiredLessons = flat.filter(l => l.id !== 'evaluacion-test' && l.id !== 'cierre-equipo')
  const completedRequired = requiredLessons.filter(l => isLessonCompleted(l.id)).length
  const isUnlocked = completedRequired === requiredLessons.length

  const [quizState, setQuizState] = useState<'intro' | 'quiz' | 'results'>('intro')
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showReview, setShowReview] = useState(false)

  // Calificación
  const correctCount = QUESTIONS.filter((q, index) => answers[index] === q.correctAnswer).length
  const passScore = 12 // 80% de 15 es 12
  const passed = correctCount >= passScore

  const alreadyFailed = progress.evaluationFailed === true
  const scoreToDisplay = alreadyFailed ? (progress.evaluationScore ?? 0) : correctCount
  const isPassedToDisplay = alreadyFailed ? false : passed

  // Si ya estaba aprobado, podemos ofrecer saltar o ver resultados
  const alreadyCompleted = isLessonCompleted('evaluacion-test')

  useEffect(() => {
    return () => {
      setIsEvaluationActive(false)
    }
  }, [setIsEvaluationActive])

  // Si ya reprobó anteriormente, forzamos la pantalla de resultados bloqueada
  useEffect(() => {
    if (alreadyFailed) {
      setQuizState('results')
    }
  }, [alreadyFailed])

  useEffect(() => {
    if (quizState === 'results' && !alreadyFailed) {
      if (passed) {
        markCurrentComplete()
        setEvaluationResult(correctCount, false)
      } else {
        setEvaluationResult(correctCount, true)
      }
    }
  }, [quizState, passed, correctCount, markCurrentComplete, setEvaluationResult, alreadyFailed])

  const handleStart = () => {
    setAnswers({})
    setCurrentIdx(0)
    setQuizState('quiz')
    setIsEvaluationActive(true)
    setShowReview(false)
  }

  const handleSelectOption = (optionIdx: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentIdx]: optionIdx
    }))
  }

  const handlePrevQuestion = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1)
    } else {
      setQuizState('results')
      setIsEvaluationActive(false)
    }
  }

  const handleRetry = () => {
    setAnswers({})
    setCurrentIdx(0)
    setQuizState('quiz')
    setIsEvaluationActive(true)
    setShowReview(false)
  }

  return (
    <div ref={containerRef} className="w-full max-w-3xl mx-auto flex flex-col gap-6">
      {/* PANTALLA INICIAL (INTRO) */}
      {quizState === 'intro' && (
        <div className="card flex flex-col gap-6 text-center items-center py-10">
          <div className="w-16 h-16 rounded-full bg-brand-600/20 border border-brand-600/40 flex items-center justify-center text-3xl shadow-glow">
            📝
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-fluid-3xl font-extrabold text-text-primary">
              Evaluación Final de BPM
            </h2>
            <p className="text-text-secondary max-w-md mx-auto leading-relaxed">
              Es momento de evaluar lo aprendido. <br />
              Para aprobar y finalizar la capacitacion, debés responder correctamente la evaluacion obligatoria.
            </p>
          </div>

          <div className="w-full max-w-sm bg-surface-elevated/50 border border-surface-border rounded-xl p-5 text-left flex flex-col gap-3">
            <div className="flex justify-between items-center text-sm border-b border-surface-border/50 pb-2">
              <span className="text-text-muted">Total de preguntas:</span>
              <span className="text-text-primary font-bold">15 preguntas</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-surface-border/50 pb-2">
              <span className="text-text-muted">Modalidad:</span>
              <span className="text-text-primary font-bold">Opción Múltiple</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-surface-border/50 pb-2">
              <span className="text-text-muted">Puntaje de aprobación:</span>
              <span className="text-brand-400 font-bold">80% (mínimo 12 correctas)</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-muted">Tiempo estimado:</span>
              <span className="text-text-primary font-bold">10 - 15 minutos</span>
            </div>
          </div>

          <div className="w-full max-w-md bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs px-4 py-3 rounded-xl flex items-start gap-2.5 text-left leading-relaxed">
            <span className="text-lg">⚠️</span>
            <span>
              <strong>Aviso importante:</strong> Una vez iniciada la evaluación, <strong>no podrás salir de ella, cerrar el menú ni navegar por otros contenidos</strong> hasta que la completes de corrido.
            </span>
          </div>

          {alreadyCompleted && (
            <div className="bg-brand-600/20 border border-brand-600/30 text-brand-300 text-xs px-4 py-2.5 rounded-lg flex items-center gap-2">
              <span>✅</span>
              <span>¡Ya aprobaste esta evaluación anteriormente! Podés volver a realizarla si deseás practicar.</span>
            </div>
          )}

          {!isUnlocked ? (
            <div className="flex flex-col items-center gap-4 mt-2">
              <button
                disabled
                className="btn-secondary bg-surface-elevated text-text-muted border border-surface-border px-8 py-3.5 flex items-center gap-2 cursor-not-allowed opacity-50"
              >
                🔒 Evaluación Bloqueada
              </button>
              <div className="bg-red-500/10 border border-red-500/30 text-red-200 text-sm px-4 py-3 rounded-xl max-w-sm flex items-center gap-3">
                <span className="text-xl">⚠️</span>
                <span className="text-left leading-snug">
                  Debés completar todas las lecciones anteriores antes de comenzar la evaluación ({completedRequired} de {requiredLessons.length} lecciones completadas).
                </span>
              </div>
            </div>
          ) : (
            <button
              onClick={handleStart}
              className="btn-primary px-8 py-3.5 shadow-glow mt-2 flex items-center gap-2"
            >
              🚀 Comenzar Evaluación
            </button>
          )}
        </div>
      )}

      {/* PANTALLA DEL QUIZ */}
      {quizState === 'quiz' && (
        <div className="card flex flex-col gap-6">
          {/* Header del Quiz */}
          <div className="flex justify-between items-center border-b border-surface-border pb-4">
            <div className="flex flex-col">
              <span className="text-xs text-brand-400 font-bold uppercase tracking-wider">
                Evaluación BPM
              </span>
              <h2 className="text-sm text-text-muted mt-0.5">
                Pregunta {currentIdx + 1} de {QUESTIONS.length}
              </h2>
            </div>
            {/* Progreso visual */}
            <div className="w-24 h-2 bg-surface-elevated rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-600 rounded-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Pregunta */}
          <div className="flex flex-col gap-4">
            <h3 className="text-fluid-xl font-bold text-text-primary leading-snug">
              {QUESTIONS[currentIdx].question}
            </h3>
            
            {/* Opciones */}
            <div className="flex flex-col gap-3 mt-2">
              {QUESTIONS[currentIdx].options.map((option, idx) => {
                const isSelected = answers[currentIdx] === idx
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-xl border text-fluid-base transition-all duration-150 flex items-start gap-3
                      ${isSelected
                        ? 'border-brand-500 bg-brand-600/20 text-brand-300 font-semibold shadow-glow'
                        : 'border-surface-border bg-surface-elevated hover:bg-surface-border text-text-primary'
                      }`}
                  >
                    <span className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center mt-0.5 text-xs
                      ${isSelected ? 'bg-brand-500 border-brand-500 text-white' : 'border-text-muted'}`}>
                      {isSelected && '✓'}
                    </span>
                    <span className="leading-tight">{option}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Botones de Navegación del Quiz */}
          <div className="flex justify-between items-center pt-4 border-t border-surface-border mt-4">
            <button
              onClick={handlePrevQuestion}
              disabled={currentIdx === 0}
              className="btn-secondary px-5 py-2.5 text-sm"
            >
              ← Anterior
            </button>
            <button
              onClick={handleNextQuestion}
              disabled={answers[currentIdx] === undefined}
              className="btn-primary px-6 py-2.5 text-sm flex items-center gap-1.5"
            >
              {currentIdx === QUESTIONS.length - 1 ? 'Finalizar y Calificar 🏆' : 'Siguiente →'}
            </button>
          </div>
        </div>
      )}

      {/* PANTALLA DE RESULTADOS */}
      {quizState === 'results' && (
        <div className="flex flex-col gap-6">
          {/* Tarjeta de resultado principal */}
          <div className={`card text-center flex flex-col items-center gap-5 py-8 border-2 ${
            isPassedToDisplay ? 'border-brand-600 bg-brand-600/10' : 'border-red-500/50 bg-red-500/10'
          }`}>
            <span className="text-6xl">{isPassedToDisplay ? '🏆' : '⚠️'}</span>
            <div className="flex flex-col gap-1">
              <h2 className={`text-fluid-3xl font-extrabold ${isPassedToDisplay ? 'text-brand-400' : 'text-red-400'}`}>
                {isPassedToDisplay ? '¡Evaluación Aprobada!' : 'Capacitación No Aprobada'}
              </h2>
              <p className="text-text-secondary text-sm max-w-md mx-auto px-4 leading-relaxed">
                {isPassedToDisplay
                  ? 'Has demostrado conocimientos sólidos sobre las Buenas Prácticas de Manufactura en Mi Gusto.'
                  : 'No has alcanzado la calificación mínima requerida. Te recomendamos revisar el contenido y solicitar a tu supervisor una oportunidad para volver a intentarlo.'
                }
              </p>
            </div>

            {/* Score */}
            <div className="flex flex-col items-center justify-center bg-surface/50 border border-surface-border/40 rounded-xl px-8 py-4 my-2">
              <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Tu Calificación</p>
              <h3 className={`text-3xl font-black mt-1 ${isPassedToDisplay ? 'text-brand-400' : 'text-red-400'}`}>
                {scoreToDisplay} / 15
              </h3>
              <p className="text-xs text-text-secondary mt-0.5">
                ({Math.round((scoreToDisplay / QUESTIONS.length) * 100)}% de respuestas correctas)
              </p>
            </div>

            {/* Botón de acción */}
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              {isPassedToDisplay ? (
                <button
                  onClick={() => setShowReview(!showReview)}
                  className="btn-secondary px-6 py-3 flex items-center gap-2 text-sm"
                >
                  {showReview ? '🙈 Ocultar Revisión' : '🔍 Revisar mis Respuestas'}
                </button>
              ) : (
                <button
                  onClick={() => {
                    const firstMod = COURSE_DATA.modules[0]
                    const firstLess = firstMod.lessons[0]
                    goToLesson(firstMod.id, firstLess.id)
                  }}
                  className="btn-primary px-8 py-3 flex items-center gap-2 text-sm font-bold"
                >
                  📖 Repasar Contenido
                </button>
              )}
            </div>

            {isPassedToDisplay && (
              <div className="text-xs text-brand-300 bg-brand-500/15 border border-brand-500/30 px-5 py-2.5 rounded-lg max-w-sm mt-3 animate-pulse-slow">
                👉 Hacé clic en el botón <strong>"Siguiente"</strong> de la barra de navegación inferior para cerrar la capacitación.
              </div>
            )}
          </div>

          {/* Sección de Revisión de Respuestas */}
          {showReview && (
            <div className="flex flex-col gap-4 mt-2">
              <h3 className="text-fluid-lg font-bold text-text-primary px-2">
                Revisión detallada de preguntas:
              </h3>
              <div className="flex flex-col gap-4">
                {QUESTIONS.map((q, index) => {
                  const userAnswer = answers[index]
                  const isCorrect = userAnswer === q.correctAnswer
                  return (
                    <div
                      key={q.id}
                      className={`card border-l-4 p-5 flex flex-col gap-3 ${
                        isCorrect ? 'border-l-brand-600 bg-surface-card' : 'border-l-red-500 bg-surface-card'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="text-fluid-base font-bold text-text-primary leading-snug">
                          {q.id}. {q.question}
                        </h4>
                        <span className={`text-xl flex-shrink-0 ${isCorrect ? 'text-brand-400' : 'text-red-400'}`}>
                          {isCorrect ? '✅ Correcta' : '❌ Incorrecta'}
                        </span>
                      </div>
                      
                      <div className="flex flex-col gap-2 mt-1">
                        <div className="text-sm">
                          <span className="text-text-muted">Tu respuesta:</span>{' '}
                          <span className={`font-semibold ${isCorrect ? 'text-brand-400' : 'text-red-400'}`}>
                            {q.options[userAnswer] ?? '(Sin responder)'}
                          </span>
                        </div>
                        {!isCorrect && (
                          <div className="text-sm">
                            <span className="text-text-muted">Respuesta correcta:</span>{' '}
                            <span className="text-brand-400 font-semibold">
                              {q.options[q.correctAnswer]}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
