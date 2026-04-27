import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // https://github.com/storybookjs/storybook/issues/34545
    {
      name: 'resolve-file-url-imports',
      enforce: 'pre',
      resolveId(id: string) {
        if (id.startsWith('file://')) {
          return fileURLToPath(id);
        }
      }
    }
  ],
  resolve: {
    alias: {
      '.cache': path.resolve(__dirname, 'node_modules/.cache')
    }
  }
})
