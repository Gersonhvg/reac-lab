import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3018,
    host: '0.0.0.0'
  },
  resolve: {
    alias: {
      '@shared': '../../shared'
    }
  },
  build: {
    target: 'esnext',
  },
  experimental: {
    // Para Server Components si es necesario
  }
})
