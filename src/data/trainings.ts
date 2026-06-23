export interface Training {
  id: string
  title: string
  shortTitle: string
  icon: string
  description: string
  active: boolean
  tagline: string
  themeColor: 'white' | 'red' | 'green' | 'yellow' | 'black' | 'blue'
  totalColaboradores?: number
}

export const TRAININGS: Training[] = [
  {
    id: 'calidad',
    title: 'Sanidad',
    shortTitle: 'Sanidad',
    icon: '🧼',
    active: true,
    tagline: 'Obligatorio y Disponible',
    description: 'Buenas Prácticas de Manufactura y desinfección en planta.',
    themeColor: 'blue',
    totalColaboradores: 141,
  },
  {
    id: 'armado',
    title: 'Armado',
    shortTitle: 'Armado',
    icon: '🥟',
    active: true,
    tagline: 'Disponible',
    description: 'Técnicas de armado, repulgue y control de calidad de empanadas.',
    themeColor: 'white',
  },
  {
    id: 'carnes',
    title: 'M. de carnes',
    shortTitle: 'Carnes',
    icon: '🥩',
    active: false,
    tagline: 'Próximamente',
    description: 'Molienda, preparación y control de calidad de rellenos cárnicos.',
    themeColor: 'red',
  },
  {
    id: 'cocina',
    title: 'Cocina',
    shortTitle: 'Cocina',
    icon: '🍳',
    active: false,
    tagline: 'Próximamente',
    description: 'Cocción de ingredientes, control de temperaturas y puntos de cocción.',
    themeColor: 'green',
  },
  {
    id: 'picadillo',
    title: 'Picadillo y Salsa',
    shortTitle: 'Picadillo',
    icon: '🥫',
    active: false,
    tagline: 'Próximamente',
    description: 'Elaboración de picadillos y salsas para rellenos.',
    themeColor: 'yellow',
  },
  {
    id: 'logistica',
    title: 'Logística y Proveedores',
    shortTitle: 'Logística',
    icon: '🚚',
    active: false,
    tagline: 'Próximamente',
    description: 'Recepción de mercadería, control de proveedores y cadena de frío.',
    themeColor: 'black',
  },
]
