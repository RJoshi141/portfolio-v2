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
      // two pages: the new site at /portfolio-v2/ and the previous one at /portfolio-v2/classic/
      input: {
        main: resolve(__dirname, 'index.html'),
        classic: resolve(__dirname, 'classic/index.html'),
      },
    },
  },
})
