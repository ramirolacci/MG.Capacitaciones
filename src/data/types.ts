// =====================================================================
// TIPOS DEL SISTEMA DE CAPACITACIONES
// =====================================================================

/**
 * Tipos de slide disponibles en el sistema.
 * Cada tipo mapea a un componente de presentación diferente.
 */
export type SlideType =
  | 'module-hero'      // Portada de módulo con ícono grande
  | 'hero'             // Slide de introducción con imagen
  | 'bullet-list'      // Lista de puntos con stagger animation
  | 'compare'          // Layout Correcto vs Incorrecto
  | 'alert'            // Card de alerta/riesgo
  | 'quote'            // Frase destacada
  | 'steps'            // Secuencia de pasos numerados
  | 'closing'          // Pantalla de cierre
  | 'commitment'       // Pantalla de compromiso final
  | 'evaluation'       // Evaluación de opción múltiple (15 preguntas)

/** Un ítem de lista simple */
export interface BulletItem {
  text: string
  icon?: string
}

/** Un par de columnas para comparativas */
export interface CompareColumn {
  label: string
  items: string[]
  variant: 'correct' | 'incorrect'
}

/** Un paso en una secuencia */
export interface Step {
  number: number
  title: string
  description?: string
}

/** Contenido de una lección — union type según el tipo de slide */
export interface LessonContent {
  title: string
  subtitle?: string
  description?: string
  items?: BulletItem[]
  compareColumns?: CompareColumn[]
  steps?: Step[]
  quote?: string
  quoteAuthor?: string
  imageAlt?: string
  imageSuggested?: string
  highlight?: string          // Texto resaltado / alerta
  highlightVariant?: 'warning' | 'danger' | 'info' | 'success'
  badge?: string              // Texto de badge (ej: "CAA")
  tagline?: string            // Tagline pequeño debajo del título
}

/** Una lección dentro de un módulo */
export interface Lesson {
  id: string
  title: string
  type: SlideType
  content: LessonContent
}

/** Módulo del curso */
export interface Module {
  id: string
  number: number
  title: string
  description: string
  icon: string                // Emoji o nombre de ícono SVG
  color: string               // Color de acento del módulo (clase Tailwind)
  colorHex: string            // Color hex para GSAP
  lessons: Lesson[]
}

/** El curso completo */
export interface Course {
  id: string
  title: string
  subtitle: string
  company: string
  totalModules: number
  objectives: string[]
  modules: Module[]
}

/** Estado de progreso del usuario */
export interface ProgressState {
  completedLessons: string[]  // array de lesson IDs
  currentModuleId: string
  currentLessonId: string
  startedAt: string | null
  completedAt: string | null
  userName?: string
  evaluationScore?: number
  evaluationFailed?: boolean
}
