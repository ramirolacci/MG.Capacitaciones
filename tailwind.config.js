/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  'rgb(var(--brand-50-rgb) / <alpha-value>)',
          100: 'rgb(var(--brand-100-rgb) / <alpha-value>)',
          200: 'rgb(var(--brand-200-rgb) / <alpha-value>)',
          300: 'rgb(var(--brand-300-rgb) / <alpha-value>)',
          400: 'rgb(var(--brand-400-rgb) / <alpha-value>)',
          500: 'rgb(var(--brand-500-rgb) / <alpha-value>)',
          600: 'rgb(var(--brand-600-rgb) / <alpha-value>)',
          700: 'rgb(var(--brand-700-rgb) / <alpha-value>)',
          800: 'rgb(var(--brand-800-rgb) / <alpha-value>)',
          900: 'rgb(var(--brand-900-rgb) / <alpha-value>)',
          950: 'rgb(var(--brand-950-rgb) / <alpha-value>)',
        },
        surface: {
          DEFAULT: '#0f1923',
          card: '#1a2535',
          elevated: '#243044',
          border: '#2d3f55',
        },
        accent: {
          amber: '#f4a261',
          amberDark: '#e07c2c',
          red: '#e05252',
          redLight: '#fde8e8',
          green: '#3dba78',
          greenLight: '#dcfce7',
          blue: '#60a5fa',
        },
        text: {
          primary: '#f1f5f9',
          secondary: '#94a3b8',
          muted: '#64748b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'fluid-sm':   'clamp(0.75rem,  1.5vw, 1rem)',
        'fluid-base': 'clamp(0.875rem, 2vw,   1.25rem)',
        'fluid-lg':   'clamp(1rem,     2.5vw, 1.45rem)',
        'fluid-xl':   'clamp(1.1rem,   3vw,   1.75rem)',
        'fluid-2xl':  'clamp(1.25rem,  4vw,   2.25rem)',
        'fluid-3xl':  'clamp(1.4rem,   5vw,   2.75rem)',
        'fluid-4xl':  'clamp(1.6rem,   6vw,   3.5rem)',
        'fluid-5xl':  'clamp(1.85rem,  7vw,   4.5rem)',
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.3)',
        glow: '0 0 24px var(--brand-glow)',
        glowAmber: '0 0 24px rgba(244, 162, 97, 0.3)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, var(--brand-600) 0%, var(--brand-700) 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0f1923 0%, #1a2535 100%)',
        'gradient-hero': 'linear-gradient(135deg, var(--brand-900) 0%, var(--brand-700) 50%, #0f1923 100%)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
