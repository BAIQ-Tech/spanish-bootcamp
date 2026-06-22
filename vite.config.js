import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Change '/spanish-bootcamp/' to match your GitHub repo name if deploying to GitHub Pages
// Leave as '/' for Vercel, Netlify, or local use
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || '/spanish-bootcamp/',
})
