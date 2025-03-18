import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Remove the GitHub Pages base if deploying to Vercel
  base: '/',
  assetsInclude: ['**/*.PNG', '**/*.JPG', '**/*.jpg', '**/*.png'],
  optimizeDeps: {
    include: ['tailwindcss']
  },
  build: {
    outDir: "dist",
  },
  server: {
    historyApiFallback: true,
  },
})
