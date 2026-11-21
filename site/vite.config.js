import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages sert le site sous /davem/ ; Netlify le sert à la racine (BASE_PATH=/).
export default defineConfig(({ command }) => ({
  base: process.env.BASE_PATH || (command === 'build' ? '/davem/' : '/'),
  plugins: [react()],
}))
