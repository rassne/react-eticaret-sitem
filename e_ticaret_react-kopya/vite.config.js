import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // This allows access via local IP
    cors: true, // Enables Cross-Origin Resource Sharing
    hmr: {
      overlay: false, // Disables the error overlay which sometimes triggers this frame error
    },
  },
})