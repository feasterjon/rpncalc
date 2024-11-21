/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa'
import { removeUseClient } from './vite/removeUseClient'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/rpncalc/',
  plugins: [
    react(),
    removeUseClient(),
    VitePWA({
      devOptions: {
        enabled: true
      },
      manifest: {
        short_name: 'RPNCalc',
        name: 'RPN Calculator',
        description: 'A Reverse Polish Notation (RPN) Calculator',
        icons: [
          {
            src: 'favicon.ico',
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/x-icon',
            purpose: 'any'
          },
          {
            src: 'images/logo192.png',
            type: 'image/png',
            sizes: '192x192',
            purpose: 'any'
          },
          {
            src: 'images/logo512.png',
            type: 'image/png',
            sizes: '512x512',
            purpose: 'any'
          },
          {
            src: 'images/logo192-maskable.png',
            type: 'image/png',
            sizes: '192x192',
            purpose: 'maskable'
          },
          {
            src: 'images/logo512-maskable.png',
            type: 'image/png',
            sizes: '512x512',
            purpose: 'maskable'
          }
        ],
        screenshots: [
          {
            src: 'images/screenshot-640x360-narrow.png',
            sizes: '640x360',
            type: 'image/png',
            label: 'RPN Calculator',
            form_factor: 'narrow'
          },
          {
            src: 'images/screenshot-640x360-wide.png',
            sizes: '640x360',
            type: 'image/png',
            label: 'RPN Calculator',
            form_factor: 'wide'
          }
        ],
        start_url: '.',
        display: 'standalone',
        theme_color: '#000000',
        background_color: '#000000'
      },
      registerType: 'autoUpdate'
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      }
    },
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/testing/setupTests.ts'
  },
  server: {
    port: 3000
  }
})
