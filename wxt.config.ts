import tailwindcss from '@tailwindcss/vite';
import { defineConfig, WxtViteConfig } from 'wxt';

const vite = () =>
  ({
    plugins: [tailwindcss()],
  }) as WxtViteConfig;

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    permissions: ['storage'],
    host_permissions: ['*://*.joinhandshake.com/*'],
  },
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
  vite,
});
