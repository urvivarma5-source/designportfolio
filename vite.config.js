import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages user site (urvivarma5-source.github.io) serves from the root,
// and a custom domain will also serve from the root — so base stays '/'.
// If this ever becomes a *project* repo (e.g. /portfolio/), set base to '/portfolio/'.
export default defineConfig({
  base: '/',
  plugins: [react()],
})
