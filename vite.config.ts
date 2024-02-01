import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
  build: {
    target: "ES2022"
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "ES2022"
    }
  }
})
