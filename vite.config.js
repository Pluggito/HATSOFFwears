import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.PNG', '**/*.JPG', '**/*.jpg', '**/*.png'],
  optimizeDeps: {
    include: ['tailwindcss']
  }
})
