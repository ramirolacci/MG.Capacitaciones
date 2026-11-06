<div align="center">

# Mi Gusto · Capacitaciones

### Plataforma de capacitación obligatoria en Buenas Prácticas de Manufactura

<br />

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

<br />

*Garantizar la elaboración de alimentos seguros para el consumidor mediante el control del personal, las instalaciones y las operaciones.*

<br />

**Mi Gusto** · Capacitación interna · Código Alimentario Argentino

</div>

---

## Sobre el proyecto

**BPM · Mi Gusto** es una plataforma web de aprendizaje diseñada para capacitar al personal de planta en **Buenas Prácticas de Manufactura (BPM)**. Combina contenido didáctico estructurado, seguimiento de progreso individual y una evaluación final obligatoria — todo en una experiencia fluida, responsive y alineada con la identidad visual de la marca.

El recorrido comienza en un **portal de formación** que centraliza las capacitaciones de la fábrica. Desde allí, el colaborador accede al módulo de Calidad (BPM), avanza por lecciones interactivas y demuestra lo aprendido en una evaluación de 15 preguntas con nota mínima de aprobación del 80%.

---

## Experiencia de aprendizaje

| | |
|---|---|
| **30 lecciones** | Distribuidas en 4 bloques temáticos: Introducción, El Personal, Las Instalaciones y Las Operaciones |
| **Progreso persistente** | Avance guardado localmente; el usuario retoma exactamente donde lo dejó |
| **Evaluación final** | 15 preguntas de opción múltiple con bloqueo de navegación durante el examen |
| **Panel administrativo** | Registro de participantes, puntajes y estado de completitud |
| **Mobile first** | Layouts adaptados para pantallas chicas sin sacrificar legibilidad |
| **Animaciones GSAP** | Transiciones suaves entre lecciones, listas y pantallas de cierre |

---

## Contenido del curso

```
Introducción          →  Qué son las BPM y por qué son obligatorias
El Personal           →  Higiene, uniforme, EPP y barrera de defensa
Las Instalaciones     →  Pisos, paredes, iluminación, agua y plagas
Las Operaciones       →  Almacenamiento, trazabilidad, limpieza y registros
Compromiso            →  Evaluación final y cierre del recorrido
```

Cada lección utiliza tipos de slide especializados — hero, listas, comparativas, alertas, pasos, citas y evaluación — para presentar la información de forma clara y memorable.

---

## Galería

<table>
  <tr>
    <td width="50%" align="center">
      <img src="docs/screenshots/01-portal-formacion.png" alt="Portal de Formación Fábrica" width="100%" />
      <br />
      <sub><strong>Portal de Formación Fábrica</strong> — hub central de capacitaciones</sub>
    </td>
    <td width="50%" align="center">
      <img src="docs/screenshots/02-landing-bpm.png" alt="Landing del curso BPM" width="100%" />
      <br />
      <sub><strong>Curso BPM</strong> — landing con objetivos y bloques del recorrido</sub>
    </td>
  </tr>
  <tr>
    <td width="50%" align="center">
      <img src="docs/screenshots/03-leccion-uniforme.png" alt="Lección Uniforme de Trabajo" width="100%" />
      <br />
      <sub><strong>Lección interactiva</strong> — contenido visual con ítems clave</sub>
    </td>
    <td width="50%" align="center">
      <img src="docs/screenshots/04-evaluacion-final.png" alt="Evaluación Final de BPM" width="100%" />
      <br />
      <sub><strong>Evaluación final</strong> — pantalla de inicio con reglas del examen</sub>
    </td>
  </tr>
</table>

<p align="center">
  <img src="docs/screenshots/05-evaluacion-pregunta.png" alt="Pregunta de evaluación BPM" width="72%" />
  <br />
  <sub><strong>Examen en curso</strong> — preguntas de opción múltiple con feedback visual</sub>
</p>

---

## Stack tecnológico

| Capa | Tecnología |
|------|------------|
| UI | React 18 · TypeScript · Tailwind CSS |
| Build | Vite 5 |
| Animaciones | GSAP 3 |
| Routing | React Router 6 |
| Estado | React Context + LocalStorage |
| Backend / BD | Supabase |

---

## Instalación y configuración

Sigue estos pasos para clonar y ejecutar el proyecto en tu entorno local:

### 1. Prerrequisitos

- **Node.js** (versión 18 o superior recomendada)
- Gestor de paquetes: **npm** o **pnpm**

### 2. Clonar el repositorio

```bash
git clone https://github.com/<tu-usuario-o-organizacion>/MG.Capacitaciones.git
cd MG.Capacitaciones
```

### 3. Instalar dependencias

Con **npm**:
```bash
npm install
```

O si utilizas **pnpm**:
```bash
pnpm install
```

### 4. Variables de entorno

Copia el archivo de variables de ejemplo y configúralo con tus credenciales de Supabase:

```bash
cp .env.example .env
```

Edita `.env` con los datos de tu proyecto de Supabase:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=tu_clave_publica_o_anon
```

> **Nota:** Si vas a configurar la base de datos en Supabase, ejecuta las consultas de `supabase_schema.sql` en el SQL Editor de tu panel de Supabase para inicializar las tablas de participantes, pines y sus políticas RLS.

### 5. Iniciar en desarrollo

```bash
npm run dev
# o con pnpm:
pnpm dev
```

La aplicación quedará disponible en `http://localhost:5173` (o el puerto que asigne Vite).

### Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` / `pnpm dev` | Inicia el servidor de desarrollo local con Hot Module Replacement (HMR). |
| `npm run build` / `pnpm build` | Compila TypeScript y genera el bundle optimizado para producción en `/dist`. |
| `npm run preview` / `pnpm preview` | Previsualiza localmente el build de producción generado. |

---

<div align="center">

<br />

**Desarrollado por el Departamento de Sistemas de Mi Gusto** 🥟

*Capacitación · Inocuidad alimentaria · Calidad*

<br />

</div>
