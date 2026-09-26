import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from the custom domain www.urvivarma.com, at the domain root, so no
// path prefix. This was '/designportfolio/' while the site was on the project
// repo's Pages URL; if it ever goes back there, this and the three other
// places in DESIGN.md §7.2 have to move together.
export default defineConfig({
  base: '/',
  plugins: [react()],
  // 5273/4273, not Vite's default 5173/4173: the SMARTER local stack publishes
  // its UI container on 127.0.0.1:5173 and needs to keep it (Urvi, 2026-09-25).
  // `strictPort` so a clash fails loudly instead of silently moving the port.
  server: { port: 5273, strictPort: true },
  preview: { port: 4273, strictPort: true },
})
