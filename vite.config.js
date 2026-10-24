import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Replace `RJoshi141` and `portfolio-v2` with your actual GitHub username & repo name
export default defineConfig({
  plugins: [react()],
  base: '/portfolio-v2/', // 👈 base must match your repo name exactly
  assetsInclude: ['**/*.glb'],
  build: {
    rollupOptions: {
      // the site at /portfolio-v2/ (src/next), the last version at /previous/ (src/revamp),
      // the original at /classic/, and /next/ which just forwards old preview links to the site
      input: {
        main: resolve(__dirname, 'index.html'),
        previous: resolve(__dirname, 'previous/index.html'),
        classic: resolve(__dirname, 'classic/index.html'),
        next: resolve(__dirname, 'next/index.html'),
      },
    },
  },
})
