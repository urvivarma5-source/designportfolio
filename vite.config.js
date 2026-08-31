import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from the custom domain www.urvivarma.com, at the domain root, so no
// path prefix. This was '/designportfolio/' while the site was on the project
// repo's Pages URL; if it ever goes back there, this and the three other
// places in DESIGN.md §7.2 have to move together.
export default defineConfig({
  base: '/',
  plugins: [react()],
})
