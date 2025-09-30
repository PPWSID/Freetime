import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

export default ({ mode }) => {
  return defineConfig({
    build: {
      sourcemap: false
    },
    plugins: [
      vue({
        template: { transformAssetUrls }
      }),
      vuetify({ autoImport: true })
    ],
    resolve: {
      alias: {
        vue: 'vue/dist/vue.esm-bundler.js',
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler' // or "modern", "legacy"
        }
      }
    },
    base: '/'
  });
};
