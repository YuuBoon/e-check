import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/e-check/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'prompt',
      scope: '/e-check/',
      manifest: {
        name: 'E-Check',
        short_name: 'E-Check',
        description: 'Elektrischer Instandhaltungs-Spick für die Produktion',
        theme_color: '#0b2e33',
        background_color: '#f4f7f7',
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: '/e-check/',
        scope: '/e-check/',
        lang: 'de-CH',
        icons: [
          { src: '/e-check/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
          { src: '/e-check/icon-maskable.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable' }
        ]
      },
      workbox: {
        cleanupOutdatedCaches: true,
        navigateFallback: 'index.html',
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,jpeg,webp,avif,svg,woff2}'],
        runtimeCaching: []
      },
      devOptions: { enabled: true }
    })
  ],
  test: { environment: 'node' }
})
