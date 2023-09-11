/// <reference types="vitest" />
// ajoute le typage de Vitest → propriété `test` dans la config
// (VSCode ne comprends pas toujours…)

/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // permet d'utiliser les méthodes de Vitest sans devoir les importer
    globals: true,
    // permet de rendre le DOM en JS
    environment: 'jsdom',
    // lien vers le fichier de configuration
    setupFiles: './test-setup.js',
  },
});
