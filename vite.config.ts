import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { cpSync, readFileSync } from 'fs'
import { resolve, extname } from 'path'

const MIME: Record<string, string> = {
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.wasm': 'application/wasm',
  '.json': 'application/json',
  '.zip': 'application/zip',
  '.html': 'text/html',
  '.d.ts': 'application/typescript',
}

// https://vite.dev/config/
export default defineConfig({
  base: '/ai-zero-to-hero/',
  plugins: [
    react(),
    {
      name: 'pyodide-assets',
      configureServer(server) {
        server.middlewares.use('/ai-zero-to-hero/pyodide', (req, res, next) => {
          const relativePath = (req.url || '').replace(/^\/+/, '')
          const filePath = resolve('node_modules', 'pyodide', relativePath)
          try {
            const content = readFileSync(filePath)
            const type = MIME[extname(filePath)] || 'application/octet-stream'
            res.setHeader('Content-Type', type)
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.end(content)
          } catch {
            next()
          }
        })
      },
      writeBundle() {
        const src = resolve('node_modules', 'pyodide')
        const dest = resolve('dist', 'pyodide')
        try {
          cpSync(src, dest, { recursive: true, force: true })
        } catch (e) {
          console.error('Failed to copy pyodide files:', e)
        }
      },
    },
  ],
})
