import react from '@vitejs/plugin-react-swc'
import path from "path"
import { defineConfig } from 'vite'
import svgr from "vite-plugin-svgr"

// https://vitejs.dev/config/
export default defineConfig({
  base: '/poletto-skins/',
  server: {
    open: true
  },
  plugins: [
    react(),
    svgr()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@sell': path.resolve(__dirname, './src/components/SellComponents'),
      '@buy': path.resolve(__dirname, './src/components/BuyComponents')
    }
  }
})
