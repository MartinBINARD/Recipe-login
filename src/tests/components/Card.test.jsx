/*
  Pour tester nos composants, on doit ajouter quelques paquets :

- jsdom et @testing-library/jest-dom → simule notre navigateur sur nos tests
- @testing-library/react → rend nos composants React côté terminal
- @testing-library/user-event → permet d'interagir avec le DOM (clic…)
*/
import { describe, it } from 'vitest';
import { render } from '@testing-library/react';

import Card from '../../components/Card';

describe('Card component', () => {
  it('Should render the card', () => {
    // je génère le rendu de mon composant
    // en utilisatn celui configuré dans `./utils`
    render(
      <Card
        thumbnail="my thumbnail"
        title="Hello World"
        difficulty="Facile"
        slug="/slug"
      />
    );
  });
});
