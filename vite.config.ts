import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { insightFunctionDev } from './vite/insightFunctionDev'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')
  const localGeminiKey = env.GEMINI_API_KEY ?? env.VITE_GEMINI_API_KEY

  return {
    plugins: [react(), tailwindcss(), insightFunctionDev(localGeminiKey)],
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname,
      },
    },
  }
})
