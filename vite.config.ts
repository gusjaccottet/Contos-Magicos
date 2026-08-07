import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY || ''),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || ''),
        'process.env.GEMINI_MODEL': JSON.stringify(env.GEMINI_MODEL || ''),
        'process.env.POLLINATIONS_MODEL': JSON.stringify(env.POLLINATIONS_MODEL || ''),
        'process.env.LLM_PROVIDER': JSON.stringify(env.LLM_PROVIDER || '')
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      server: {
        // Allow the live-preview host to reach the dev server
        allowedHosts: true,
      }
    };
});
