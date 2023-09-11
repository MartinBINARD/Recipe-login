import { render, screen } from '../../utils';

import Card from '../../../components/Card';

describe('Card component', () => {
  it('Should render the card', () => {
    // je génère le rendu de mon composant <Card />
    // j'utilise ma version de render…
    render(
      <Card
        title="Hello World"
        thumbnail="My thumbnail"
        difficulty="Facile"
        slug="/toto"
        //
        id={42}
        author="Dave Lopper"
        description="Test Card component"
        ingredients={[]}
        instructions={[]}
      />
    );

    // je m'attends à avoir un élément avec le texte
    // "Hello World" dans ma page
    // https://testing-library.com/docs/queries/about
    expect(screen.getByText('Hello World')).toBeInTheDocument();

    // je vérifie que je dispose bien d'un lien contenant le texte
    // "Voir la recette"
    expect(
      screen.getByRole('link', { name: 'Voir la recette' })
    ).toBeInTheDocument();

    /*
      ATTENTION à ce point nous avons une erreur dans le console
      de tests…
      Il y a un défaut de compatibilité entre nos versions
      de Vite et Vitest !
      Je mets à jour les paquets avec npm-check-updates
      (https://www.npmjs.com/package/npm-check-updates)
    */
  });
});
