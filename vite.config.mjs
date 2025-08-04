import { defineConfig, loadEnv } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'node:path';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    plugins: [svelte()],
    server: {
      host: '0.0.0.0',
      port: 5173,
      proxy: {
        '/api': {
          target: isProduction
            ? 'https://syncrosignage.com'
            : 'http://192.168.210.86:8000',
          changeOrigin: true,
          secure: false,
        },
      },
    },
    optimizeDeps: {
      include: ['svelte-icons/fa'],
    },
    resolve: {
      alias: {
        $src: path.resolve('./src'),
      },
    },
  };
});
