import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// En ligne, le site est servi sous https://iso-doss.github.io/davem/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/davem/' : '/',
  plugins: [react()],
}))
