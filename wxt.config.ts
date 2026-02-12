import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'LinkedIn Text Formatter',
    description: 'Format your LinkedIn posts with bold, italic, underline, and more Unicode text styles',
    version: '1.0.0',
    permissions: ['activeTab'],
    host_permissions: ['*://*.linkedin.com/*'],
  },
  vite: () => ({
    plugins: [tailwindcss()],
  }),
});
