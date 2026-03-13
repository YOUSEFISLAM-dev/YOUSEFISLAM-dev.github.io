import tailwindcss from '@tailwindcss/vite';
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(), 
      tailwindcss(),
      legacy({
        targets: ['defaults', 'not IE 11'],
      }),
    ],
    base: './',
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.YOUTUBE_API_KEY': JSON.stringify(env.YOUTUBE_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          about: path.resolve(__dirname, 'about.html'),
          news: path.resolve(__dirname, 'news.html'),
          sectors: path.resolve(__dirname, 'sectors.html'),
          projects: path.resolve(__dirname, 'projects.html'),
          'project-detail': path.resolve(__dirname, 'project-detail.html'),
          innovation: path.resolve(__dirname, 'innovation.html'),
          gallery: path.resolve(__dirname, 'gallery.html'),
          contact: path.resolve(__dirname, 'contact.html'),
        },
      },
    },
  };
});
