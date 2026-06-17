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
          50:  '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#2d6a4f',  // Mi Gusto primary
          700: '#1a4a38',
          800: '#145030',
          900: '#0d3320',
          950: '#052010',
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
        'fluid-sm': 'clamp(0.85rem, 1.5vw, 1rem)',
        'fluid-base': 'clamp(1rem, 2vw, 1.25rem)',
        'fluid-lg': 'clamp(1.125rem, 2.5vw, 1.45rem)',
        'fluid-xl': 'clamp(1.25rem, 3vw, 1.75rem)',
        'fluid-2xl': 'clamp(1.5rem, 4vw, 2.25rem)',
        'fluid-3xl': 'clamp(1.75rem, 5vw, 2.75rem)',
        'fluid-4xl': 'clamp(2.25rem, 6vw, 3.5rem)',
        'fluid-5xl': 'clamp(2.75rem, 7vw, 4.5rem)',
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.3)',
        glow: '0 0 24px rgba(45, 106, 79, 0.4)',
        glowAmber: '0 0 24px rgba(244, 162, 97, 0.3)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #2d6a4f 0%, #1a4a38 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0f1923 0%, #1a2535 100%)',
        'gradient-hero': 'linear-gradient(135deg, #0d3320 0%, #1a4a38 50%, #0f1923 100%)',
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
