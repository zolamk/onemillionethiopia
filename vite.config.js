import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import components from 'vite-plugin-components'
import graphql from '@rollup/plugin-graphql'
import path from 'path'
import pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [vue(), components(), graphql(), pages()]
})
