import type { Course } from './types'

export const COURSE_DATA: Course = {
  id: 'bpm-mi-gusto',
  title: 'Buenas Prácticas de Manufactura',
  subtitle: 'Capacitación obligatoria BPM',
  company: 'Mi Gusto',
  totalModules: 4,
  objectives: [
    'Garantizar la elaboración de alimentos seguros',
    'Controlar el personal, las instalaciones y las operaciones',
    'Cumplir con el Código Alimentario Argentino',
  ],
  modules: [
    // ─── MÓDULO 0: INTRODUCCIÓN ───────────────────────────────────────
    {
      id: 'intro',
      number: 0,
      title: 'Introducción',
      description: 'Qué son las BPM y por qué son obligatorias.',
      icon: '🏭',
      color: 'brand-600',
      colorHex: '#2d6a4f',
      lessons: [
        {
          id: 'intro-portada',
          title: 'BPM — Mi Gusto',
          type: 'hero',
          content: {
            title: 'Buenas Prácticas de Manufactura',
            subtitle: 'Capacitación BPM',
            description: 'Garantizar la elaboración de alimentos seguros para el consumidor mediante el control del personal, las instalaciones y las operaciones.',
            imageSuggested: 'Foto general de la planta Mi Gusto',
            imageAlt: 'Planta de producción Mi Gusto',
            tagline: 'Mi Gusto · Capacitación obligatoria',
          },
        },
        {
          id: 'intro-que-son',
          title: '¿Qué son las BPM?',
          type: 'bullet-list',
          content: {
            title: '¿Qué son las BPM?',
            description: 'Las Buenas Prácticas de Manufactura son un conjunto de procedimientos obligatorios establecidos por el Código Alimentario Argentino para asegurar la inocuidad de los alimentos.',
            badge: 'CAA',
            imageSuggested: 'Producto terminado + consumidor satisfecho',
            imageAlt: 'Consumidor satisfecho con producto Mi Gusto',
            items: [
              { text: 'Alimentos seguros', icon: '✅' },
              { text: 'Menos reclamos', icon: '📉' },
              { text: 'Menos desperdicios', icon: '♻️' },
              { text: 'Cumplimiento legal', icon: '⚖️' },
            ],
          },
        },
      ],
    },

    // ─── MÓDULO 1: PERSONAL ───────────────────────────────────────────
    {
      id: 'personal',
      number: 1,
      title: 'El Personal',
      description: 'La primera barrera de defensa contra la contaminación.',
      icon: '👷🏻',
      color: 'blue-500',
      colorHex: '#3b82f6',
      lessons: [
        {
          id: 'personal-hero',
          title: 'Bloque 1: El Personal',
          type: 'module-hero',
          content: {
            title: 'El Personal',
            subtitle: 'Bloque 1',
            description: 'El personal es la primera barrera de defensa en la cadena de inocuidad alimentaria.',
            tagline: '7 lecciones',
          },
        },
        {
          id: 'personal-barrera',
          title: 'Primera barrera de defensa',
          type: 'alert',
          content: {
            title: 'El Personal es la Primera Barrera de Defensa',
            description: 'Un manipulador puede contaminar un alimento con:',
            items: [
              { text: 'Cabellos', icon: '💇🏻' },
              { text: 'Microorganismos', icon: '🦠' },
              { text: 'Objetos personales', icon: '💍' },
              { text: 'Malas prácticas', icon: '❌' },
            ],
            imageSuggested: 'Operario correctamente vestido',
            imageAlt: 'Operario con EPP correcto',
            highlight: 'Cada trabajador es responsable de la inocuidad del producto.',
            highlightVariant: 'warning',
          },
        },
        {
          id: 'personal-higiene',
          title: 'Higiene Personal',
          type: 'steps',
          content: {
            title: 'Higiene Personal',
            subtitle: 'Antes de ingresar a producción',
            imageSuggested: 'Primer plano de manos limpias',
            imageAlt: 'Manos limpias en lavamanos',
            steps: [
              { number: 1, title: 'Bañarse diariamente' },
              { number: 2, title: 'Uñas cortas y sin esmalte' },
              { number: 3, title: 'Sin perfumes excesivos' },
              { number: 4, title: 'Manos limpias al ingresar' },
            ],
          },
        },
        {
          id: 'personal-prohibidos',
          title: 'Elementos Prohibidos',
          type: 'compare',
          content: {
            title: 'Elementos Prohibidos en Producción',
            description: 'Pueden caer al producto y generar contaminación física.',
            imageSuggested: 'Foto comparativa Correcto vs Incorrecto',
            imageAlt: 'Comparación de uso de accesorios',
            highlight: 'Riesgo: Contaminación física del producto.',
            highlightVariant: 'danger',
            compareColumns: [
              {
                label: 'No permitido ❌',
                variant: 'incorrect',
                items: ['Anillos', 'Aros colgantes', 'Pulseras', 'Relojes', 'Piercings expuestos'],
              },
              {
                label: 'Correcto ✅',
                variant: 'correct',
                items: ['Sin accesorios', 'Uniforme limpio', 'Cofia colocada', 'Barbijo puesto'],
              },
            ],
          },
        },
        {
          id: 'personal-uniforme',
          title: 'Uniforme de Trabajo',
          type: 'bullet-list',
          content: {
            title: 'Uniforme de Trabajo',
            description: 'El uniforme debe mantenerse en condiciones óptimas en todo momento.',
            imageSuggested: 'Personal de Mi Gusto correctamente uniformado',
            imageAlt: 'Personal con uniforme completo',
            items: [
              { text: 'Limpio', icon: '✨' },
              { text: 'Completo', icon: '✅' },
              { text: 'En buen estado', icon: '👍' },
              { text: 'Exclusivo para producción', icon: '🏭' },
            ],
          },
        },
        {
          id: 'personal-cofia',
          title: 'Uso de Cofia y Barbijo',
          type: 'compare',
          content: {
            title: 'Uso Correcto de Cofia y Barbijo',
            imageSuggested: 'Ejemplo correcto e incorrecto de cofia y barbijo',
            imageAlt: 'Uso correcto e incorrecto de EPP facial',
            compareColumns: [
              {
                label: 'Incorrecto ❌',
                variant: 'incorrect',
                items: ['Cabello expuesto fuera de la cofia', 'Barbijo bajo la nariz', 'Barbijo solo en la boca'],
              },
              {
                label: 'Correcto ✅',
                variant: 'correct',
                items: ['Cofia cubre totalmente el cabello', 'Barbijo cubre nariz y boca', 'Ajuste firme y seguro'],
              },
            ],
          },
        },
        {
          id: 'personal-lavado',
          title: 'Lavado de Manos',
          type: 'steps',
          content: {
            title: 'Lavado de Manos',
            subtitle: 'Momentos obligatorios',
            imageSuggested: 'Secuencia de lavado de manos paso a paso',
            imageAlt: 'Secuencia de lavado de manos',
            steps: [
              { number: 1, title: 'Al ingresar a producción' },
              { number: 2, title: 'Luego de ir al baño' },
              { number: 3, title: 'Después de comer o beber' },
              { number: 4, title: 'Luego de tocar residuos' },
              { number: 5, title: 'Al cambiar de tarea' },
            ],
          },
        },
        {
          id: 'personal-salud',
          title: 'Salud del Personal',
          type: 'alert',
          content: {
            title: 'Salud del Personal',
            description: 'No debe manipular alimentos quien presente alguna de estas condiciones:',
            items: [
              { text: 'Vómitos o náuseas', icon: '🤢' },
              { text: 'Diarrea', icon: '⚠️' },
              { text: 'Fiebre', icon: '🌡️' },
              { text: 'Heridas infectadas', icon: '🩹' },
            ],
            highlight: 'Informar siempre al supervisor ante cualquiera de estas situaciones.',
            highlightVariant: 'danger',
          },
        },
      ],
    },

    // ─── MÓDULO 2: INSTALACIONES ──────────────────────────────────────
    {
      id: 'instalaciones',
      number: 2,
      title: 'Las Instalaciones',
      description: 'Condiciones físicas que garantizan la elaboración segura.',
      icon: '🏗️',
      color: 'amber-500',
      colorHex: '#f59e0b',
      lessons: [
        {
          id: 'inst-hero',
          title: 'Bloque 2: Instalaciones',
          type: 'module-hero',
          content: {
            title: 'Las Instalaciones',
            subtitle: 'Bloque 2',
            description: 'El CAA establece que los establecimientos deben mantenerse en condiciones que permitan la elaboración segura de alimentos.',
            tagline: '7 lecciones',
          },
        },
        {
          id: 'inst-intro',
          title: 'Instalaciones Higiénicas',
          type: 'bullet-list',
          content: {
            title: 'Instalaciones Higiénicas',
            badge: 'CAA',
            description: 'El Código Alimentario Argentino establece que los establecimientos deben mantenerse en condiciones que permitan la elaboración segura de alimentos.',
            items: [
              { text: 'Superficies lavables y resistentes', icon: '🧹' },
              { text: 'Sin grietas ni roturas', icon: '🔍' },
              { text: 'Libres de humedad y desprendimientos', icon: '💧' },
              { text: 'Buena iluminación y ventilación', icon: '💡' },
            ],
          },
        },
        {
          id: 'inst-pisos',
          title: 'Pisos',
          type: 'bullet-list',
          content: {
            title: 'Pisos',
            imageSuggested: 'Piso sanitario de la planta',
            imageAlt: 'Piso lavable antideslizante de la planta',
            items: [
              { text: 'Lavables', icon: '✅' },
              { text: 'Resistentes', icon: '✅' },
              { text: 'Antideslizantes', icon: '✅' },
              { text: 'Sin roturas ni grietas', icon: '✅' },
            ],
          },
        },
        {
          id: 'inst-paredes',
          title: 'Paredes y Techos',
          type: 'compare',
          content: {
            title: 'Paredes y Techos',
            imageSuggested: 'Ejemplo correcto e incorrecto de paredes',
            imageAlt: 'Estado de paredes y techos',
            compareColumns: [
              {
                label: 'Incorrecto ❌',
                variant: 'incorrect',
                items: ['Con humedad o manchas', 'Con desprendimientos', 'Sucios o con hongos'],
              },
              {
                label: 'Correcto ✅',
                variant: 'correct',
                items: ['Limpios y secos', 'Sin humedad', 'Sin desprendimientos'],
              },
            ],
          },
        },
        {
          id: 'inst-iluminacion',
          title: 'Iluminación',
          type: 'bullet-list',
          content: {
            title: 'Iluminación',
            description: 'Una buena iluminación es fundamental para la seguridad alimentaria.',
            items: [
              { text: 'Detectar suciedad fácilmente', icon: '🔦' },
              { text: 'Verificar limpieza correctamente', icon: '🔍' },
              { text: 'Evitar errores en el proceso', icon: '✅' },
            ],
          },
        },
        {
          id: 'inst-ventilacion',
          title: 'Ventilación',
          type: 'bullet-list',
          content: {
            title: 'Ventilación',
            description: 'La ventilación adecuada es clave para mantener condiciones seguras de producción.',
            items: [
              { text: 'Evitar condensación', icon: '💨' },
              { text: 'Reducir humedad ambiental', icon: '📉' },
              { text: 'Mejorar el ambiente de trabajo', icon: '🌬️' },
            ],
          },
        },
        {
          id: 'inst-agua',
          title: 'Agua Potable',
          type: 'alert',
          content: {
            title: 'Agua Potable',
            description: 'Toda el agua utilizada en la planta debe ser potable:',
            items: [
              { text: 'Elaboración de productos', icon: '🍽️' },
              { text: 'Limpieza de equipos y superficies', icon: '🧽' },
              { text: 'Lavado de manos del personal', icon: '🙌' },
            ],
            highlight: 'El uso de agua no potable es causa directa de contaminación alimentaria.',
            highlightVariant: 'danger',
          },
        },
        {
          id: 'inst-plagas',
          title: 'Control de Plagas',
          type: 'alert',
          content: {
            title: 'Control de Plagas',
            description: 'Se debe evitar el ingreso de:',
            items: [
              { text: 'Insectos', icon: '🪲' },
              { text: 'Roedores', icon: '🐀' },
              { text: 'Aves', icon: '🐦' },
            ],
            highlight: 'Señales de alerta: excrementos, insectos vivos, material dañado o roído.',
            highlightVariant: 'warning',
          },
        },
      ],
    },

    // ─── MÓDULO 3: OPERACIONES ────────────────────────────────────────
    {
      id: 'operaciones',
      number: 3,
      title: 'Las Operaciones',
      description: 'Control de procesos para garantizar la inocuidad.',
      icon: '⚙️',
      color: 'purple-500',
      colorHex: '#a855f7',
      lessons: [
        {
          id: 'op-hero',
          title: 'Bloque 3: Operaciones',
          type: 'module-hero',
          content: {
            title: 'Las Operaciones',
            subtitle: 'Bloque 3',
            description: 'El control de los procesos productivos es fundamental para garantizar que el alimento llegue al consumidor de forma segura.',
            tagline: '8 lecciones',
          },
        },
        {
          id: 'op-recepcion',
          title: 'Recepción de Materias Primas',
          type: 'steps',
          content: {
            title: 'Recepción de Materias Primas',
            subtitle: 'Verificar siempre al recibir',
            steps: [
              { number: 1, title: 'Temperatura del producto y transporte' },
              { number: 2, title: 'Estado del vehículo de entrega' },
              { number: 3, title: 'Integridad de los envases' },
              { number: 4, title: 'Fecha de vencimiento' },
              { number: 5, title: 'Número de lote' },
            ],
          },
        },
        {
          id: 'op-almacenamiento',
          title: 'Almacenamiento',
          type: 'bullet-list',
          content: {
            title: 'Almacenamiento',
            description: 'Separar correctamente para evitar contaminación cruzada.',
            imageSuggested: 'Depósito ordenado y correctamente organizado',
            imageAlt: 'Depósito ordenado de materias primas',
            items: [
              { text: 'Materias primas', icon: '📦' },
              { text: 'Material de empaque', icon: '📫' },
              { text: 'Producto terminado', icon: '🏷️' },
              { text: 'Productos químicos', icon: '⚗️' },
            ],
            highlight: 'Cada categoría debe almacenarse en su área designada, separada físicamente.',
            highlightVariant: 'info',
          },
        },
        {
          id: 'op-lotes',
          title: 'Identificación de Lotes',
          type: 'alert',
          content: {
            title: 'Identificación de Lotes',
            description: 'Todo producto debe estar identificado con su número de lote.',
            highlight: 'Sin identificación de lote → no existe trazabilidad. Si hay un problema, no se puede rastrear el producto.',
            highlightVariant: 'danger',
            items: [
              { text: 'Identificar siempre todo producto', icon: '🏷️' },
              { text: 'Registrar el lote en planillas', icon: '📋' },
              { text: 'Permitir trazabilidad completa', icon: '🔍' },
            ],
          },
        },
        {
          id: 'op-contaminacion',
          title: 'Contaminación Cruzada',
          type: 'alert',
          content: {
            title: 'Contaminación Cruzada',
            description: 'Ocurre cuando un contaminante pasa de un lugar a otro. Ejemplos:',
            items: [
              { text: 'Manos sucias que tocan alimentos', icon: '🤲' },
              { text: 'Utensilios contaminados sin lavar', icon: '🍴' },
              { text: 'Contacto entre productos crudos y cocidos', icon: '🥩' },
            ],
            highlight: 'La contaminación cruzada es una de las principales causas de enfermedades transmitidas por alimentos.',
            highlightVariant: 'danger',
          },
        },
        {
          id: 'op-limpieza',
          title: 'Limpieza y Desinfección',
          type: 'bullet-list',
          content: {
            title: 'Limpieza y Desinfección',
            badge: 'CAA',
            description: 'El CAA establece que las áreas de manipulación, equipos y utensilios deben limpiarse y desinfectarse con la frecuencia necesaria para evitar contaminación.',
            items: [
              { text: 'Áreas de manipulación de alimentos', icon: '🧹' },
              { text: 'Equipos y maquinaria', icon: '⚙️' },
              { text: 'Utensilios y herramientas', icon: '🍴' },
              { text: 'Con la frecuencia necesaria', icon: '🔄' },
            ],
          },
        },
        {
          id: 'op-quimicos',
          title: 'Productos Químicos',
          type: 'steps',
          content: {
            title: 'Productos Químicos',
            badge: 'CAA',
            description: 'El CAA exige su control para evitar contaminación química.',
            steps: [
              { number: 1, title: 'Identificados correctamente con etiqueta' },
              { number: 2, title: 'Autorizados para uso en industria alimentaria' },
              { number: 3, title: 'Almacenados fuera del área de producción' },
            ],
          },
        },
        {
          id: 'op-residuos',
          title: 'Residuos',
          type: 'alert',
          content: {
            title: 'Residuos',
            description: 'Los residuos deben retirarse frecuentemente para evitar:',
            items: [
              { text: 'Generación de olores', icon: '👃' },
              { text: 'Atracción de plagas', icon: '🪲' },
              { text: 'Contaminación de productos', icon: '⚠️' },
            ],
            highlight: 'Los residuos acumulados son una de las principales fuentes de contaminación y atracción de plagas.',
            highlightVariant: 'warning',
          },
        },
        {
          id: 'op-registros',
          title: 'Registros',
          type: 'quote',
          content: {
            title: 'Registros',
            quote: 'Si no está registrado, no puede demostrarse.',
            description: 'Completar siempre:',
            items: [
              { text: 'Planillas de control', icon: '📋' },
              { text: 'Registros de limpieza y desinfección', icon: '🧹' },
              { text: 'Trazabilidad de lotes', icon: '🔍' },
              { text: 'Controles de temperatura', icon: '🌡️' },
            ],
          },
        },
      ],
    },

    // ─── MÓDULO 4: CIERRE ─────────────────────────────────────────────
    {
      id: 'cierre',
      number: 4,
      title: 'Compromiso',
      description: 'Todos somos responsables de la inocuidad alimentaria.',
      icon: '🤝',
      color: 'brand-600',
      colorHex: '#2d6a4f',
      lessons: [
        {
          id: 'cierre-responsables',
          title: 'Todos Somos Responsables',
          type: 'alert',
          content: {
            title: 'Todos Somos Responsables',
            description: 'La inocuidad no depende solamente del área de Calidad. Cada colaborador es responsable de proteger al consumidor.',
            imageSuggested: 'Foto grupal del personal Mi Gusto',
            imageAlt: 'Equipo Mi Gusto trabajando junto',
            highlight: 'Cada tarea que realizás, por pequeña que sea, impacta en la seguridad del alimento.',
            highlightVariant: 'success',
            items: [
              { text: 'El personal', icon: '👷🏻' },
              { text: 'Producción', icon: '🏭' },
              { text: 'Calidad', icon: '✅' },
              { text: 'Logística', icon: '🚛' },
            ],
          },
        },
        {
          id: 'cierre-compromiso',
          title: 'Mi Compromiso',
          type: 'commitment',
          content: {
            title: 'Mi Compromiso',
            quote: '"Cada tarea que realizo impacta en la seguridad del alimento que llegará a una familia."',
            description: 'Al completar esta capacitación, me comprometo a aplicar las Buenas Prácticas de Manufactura en cada jornada de trabajo.',
          },
        },
        {
          id: 'evaluacion-test',
          title: 'Evaluación de BPM',
          type: 'evaluation',
          content: {
            title: 'Evaluación de BPM',
            description: 'Completá la evaluación obligatoria de 15 preguntas de opción múltiple.',
          },
        },
        {
          id: 'cierre-equipo',
          title: 'Trabajemos en Equipo',
          type: 'closing',
          content: {
            title: '¡Gracias por capacitarte!',
            subtitle: 'Trabajemos en Equipo',
            description: 'La calidad y la inocuidad la hacemos entre todos.',
            tagline: 'Mi Gusto · BPM',
          },
        },
      ],
    },
  ],
}

/** Retorna el total de lecciones del curso */
export const getTotalLessons = (): number =>
  COURSE_DATA.modules.reduce((acc, m) => acc + m.lessons.length, 0)

/** Retorna la lista plana de todas las lecciones con su moduleId */
export const getFlatLessons = () =>
  COURSE_DATA.modules.flatMap(m =>
    m.lessons.map(l => ({ ...l, moduleId: m.id, moduleNumber: m.number }))
  )

/** Retorna la lección siguiente a la actual */
export const getNextLesson = (moduleId: string, lessonId: string) => {
  const flat = getFlatLessons()
  const idx = flat.findIndex(l => l.moduleId === moduleId && l.id === lessonId)
  return flat[idx + 1] ?? null
}

/** Retorna la lección anterior a la actual */
export const getPrevLesson = (moduleId: string, lessonId: string) => {
  const flat = getFlatLessons()
  const idx = flat.findIndex(l => l.moduleId === moduleId && l.id === lessonId)
  return flat[idx - 1] ?? null
}
