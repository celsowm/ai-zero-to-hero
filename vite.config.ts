import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { cpSync, readFileSync } from 'fs'
import { resolve, extname } from 'path'
import { discoverTorchPyodideWheelInfo } from './torchPyodideWheel'

const MIME: Record<string, string> = {
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.wasm': 'application/wasm',
  '.json': 'application/json',
  '.zip': 'application/zip',
  '.html': 'text/html',
  '.d.ts': 'application/typescript',
}

const torchPyodideWheel = discoverTorchPyodideWheelInfo(resolve('public', 'vendor', 'python'))

// https://vite.dev/config/
export default defineConfig({
  base: '/ai-zero-to-hero/',
  define: {
    __TORCH_PYODIDE_WHEEL_FILE__: JSON.stringify(torchPyodideWheel.fileName),
    __TORCH_PYODIDE_PYPI_SPEC__: JSON.stringify(torchPyodideWheel.pypiSpec),
  },
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
