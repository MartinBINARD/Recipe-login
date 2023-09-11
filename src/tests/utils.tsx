/* eslint-disable import/no-extraneous-dependencies */
/*
  > https://testing-library.com/docs/react-testing-library/setup#custom-render
  Quand on utilise des _providers_ comme avec React Router et Redux,
  il faut fournir ces données aux composants lors des tests.
  Pour cela, on va personnaliser la fonction `render` de React testing Library.
  → tous non composants testés se verront envelopper dans les providers utilisés
*/
import React from 'react';
import { RenderOptions, cleanup, render } from '@testing-library/react';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from '../store';

// après chaque test, on nettoie le DOM
afterEach(() => {
  cleanup();
});

// on prépare nos providers
// ici Redux + React Router
// on ajoute chaque provider utilisé (ThemeProvider…)
function AllTheProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* j'entoure mon composant à tester de Redux et Router */}
        {children}
      </BrowserRouter>
    </Provider>
  );
}

// on personnalise `render`
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// on ré-exporte toute la librairie :
// on importera, dans nos tests, depuis ce fichier
export * from '@testing-library/react';

// on oublie notre fonction personnalisée
export { customRender as render };
