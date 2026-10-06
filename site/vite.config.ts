import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // tokens.css and the ARM-14 renders live in docs/design, one level above site/
  server: { port: 5180, fs: { allow: ['..'] } },
})
