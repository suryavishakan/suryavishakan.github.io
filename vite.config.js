import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'
export default defineConfig({ build: { assetsInlineLimit: 100000000 },
  plugins: [react(), viteSingleFile()] })
