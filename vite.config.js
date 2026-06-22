import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from the custom domain spanish-bootcamp.baiq.tech at root, so base stays '/'.
// Override with VITE_BASE_PATH=/spanish-bootcamp/ only if deploying without the custom domain.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || '/',
})
