import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Project repo (urvivarma5-source/designportfolio) → GitHub Pages serves it
// from /designportfolio/, so every asset URL needs that prefix.
// If this ever moves to a user site or a custom domain, set base back to '/'
// and drop the basename in src/main.jsx.
export default defineConfig({
  base: '/designportfolio/',
  plugins: [react()],
})
