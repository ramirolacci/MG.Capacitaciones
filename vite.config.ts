import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Trigger server restart to reload tailwind config
export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    base: command === 'serve' ? '/' : '/fabrica/capacitaciones/',
  }
})
