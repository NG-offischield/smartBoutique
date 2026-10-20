import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = (env.VITE_SITE_URL || 'https://the-smart-boutique.vercel.app').replace(/\/$/, '')

  return {
    base: env.VITE_BASE || '/',
    plugins: [
      vue(),
      // Remplace __SITE_URL__ dans index.html (URLs absolues pour le partage sur les réseaux sociaux)
      { name: 'site-url', transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', siteUrl) }
    ],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
    },
    test: {
      environment: 'jsdom'
    }
  }
})
