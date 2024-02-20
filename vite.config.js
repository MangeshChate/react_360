import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.glb'],
  // ...other vite config
  plugins: [react() ,],
  
})


