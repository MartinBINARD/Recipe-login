/*
  pour ajouter la propriété `test` à l'objet donné à `defineConfig`,  
  on étend les types de Vite avec ceux de Vitest
  (mais ça marche pas toujours sur VS Code…)
*/

/// <reference types="vitest">

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // configuration des tests pour les composants
  test: {
    // on va gérer le DOM en JS
    environnement: 'jsdom',
    // le fichier de _setup_ qui sera exécuté avant de lancer nos tests
    // fournir plus d'options dans la commande expect,
    // voire simulera un serveur pour les requêtes HTTP
    setupFiles: './src/tests/setup.ts',
  },
});
