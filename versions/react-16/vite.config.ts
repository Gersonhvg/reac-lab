// vite.config.ts - CONFIGURACIÓN CORREGIDA
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
        jsxRuntime: 'classic', // React 16 requiere JSX clásico
    })
  ],
  server: {
    port: 3016,
    host: '0.0.0.0'
  },
  resolve: {
    alias: {
      '@shared': '../../shared'
    }
  }
})