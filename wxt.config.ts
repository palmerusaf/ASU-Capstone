import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';
import { defineConfig, WxtViteConfig } from 'wxt';

const vite = () =>
  ({
    optimizeDeps: { exclude: ['@electric-sql/pglite'] },
    plugins: [tailwindcss()],
  }) as WxtViteConfig;

const authRedirectUrl =
  'https://iilhhpgfemomamfecgiaaooobfbjjhpc.chromiumapp.org/';

// See https://wxt.dev/api/config.html
export default defineConfig({
  runner: {
    chromiumProfile: resolve('./.chrome-dev-folder/'),
    keepProfileChanges: true,
  },
  manifest: {
    permissions: ['storage', 'identity'],
    host_permissions: [
      '*://*.joinhandshake.com/*',
      'https://flyuzhywofhcnrpfyuui.supabase.co/*',
    ],
    externally_connectable: {
      matches: [authRedirectUrl],
    },
    //this is needed so the extension id for prod and dev are the same
    key: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4ZumQ+iYBWd2HUHu4YCKoEfYXFfUPsKjaWaRSbzQ6b0YI8KlMMu2OE/mNYgdUesS1YzhMU9F77whMAQjhonXdLDoOZaocvu5p4c+6YBP0s7+v5tIllEZw4mNPeydoJCedCG6KBDmLfMJ8LcTLaLeBMoPpW2DCDTU6tgZNHnflrwOoymOO5VLiV3KMSyJ2P4KbYLpCnFecbWBehFBjQkdtcA671Wj2JwmKlc0vQlriPgIWHYb9UNAo2hddsD2wq4udQzfgzA1FV/50fCk/XzKqe43z0qILYpMkM6ZpqUfb/0br+C3i7jWEcTCm0+/XpGenhQTbyP1OschG08vbINj1wIDAQAB',
    oauth2: {
      client_id:
        '279554326966-7pna66lsrfre17smtt0dsdbhiraqshbh.apps.googleusercontent.com',
      scopes: ['openid', 'email', 'profile'],
    },
    content_security_policy: {
      extension_pages:
        "script-src 'self' 'wasm-unsafe-eval'; object-src 'self'",
    },
  },
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
  vite,
});
