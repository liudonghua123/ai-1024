import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  preview: {
    allowedHosts: true, // 允许任意 host 访问（tunnel 场景）
  },
})
