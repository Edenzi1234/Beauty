import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

export default defineConfig({
  base: './', // relative asset paths so the build works on any host or sub-path
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        course: resolve(import.meta.dirname, 'index.html'),
        lashLift: resolve(import.meta.dirname, 'lash-lift/index.html'),
      },
    },
  },
  server: { host: true, port: 5173 },
  preview: { host: true, port: 4173 },
})
