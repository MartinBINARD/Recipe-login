/*
  On teste le sélecteur `findRecipe`

  - il doit être une fonction
  - il doit retourner un objet Recipe ou undefined

  - il doit retourner la première recette si on lui passe le premier slug
  - il doit retourner `undefined` quand le slug n'existe pas

  Rappel : pour tester l'unité de code on l'importe !
  Besoin : il faut des données !
    → on utilise le fichier `data.js`
    → const firstRecipe = data[0];
    → const firstSlug = firstRecipe.slug;
*/

import { describe, expect, expectTypeOf, it } from 'vitest';
import { findRecipe } from '../../../store/selectors/recipes';

import data from '../../../data';
import { Recipe } from '../../../@types/recipe';

const firstRecipe = data[0];
const firstSlug = firstRecipe.slug;

const fakeState = {
  recipes: {
    list: data,
  },
};

describe('findRecipe selector', () => {
  describe('Structure', () => {
    it('Should be a function', () => {
      expectTypeOf(findRecipe).toBeFunction();
    });

    it('Should return a Recipe object if found or undefined', () => {
      // j'exécute ma fonction
      const found = findRecipe(firstSlug)(fakeState); // tant pis pour TS
      // console.log(found);

      // https://vitest.dev/api/expect-typeof.html#tomatchtypeof
      expectTypeOf(found).toMatchTypeOf<Recipe | undefined>();

      const notFound = findRecipe('unknown slug')(fakeState);
      expectTypeOf(notFound).toMatchTypeOf<Recipe | undefined>();
    });
  });

  describe('Execution', () => {
    it('Should return the first recipe for the first slug', () => {
      const found = findRecipe(firstSlug)(fakeState);
      expect(found).toEqual(firstRecipe);
    });

    it('Should return undefined for an unknown slug', () => {
      const notFound = findRecipe('unknown slug')(fakeState);
      expect(notFound).toBeUndefined();
    });

    // on avait oublié un cas : `list` est un tableau vide
    // exemple au chargement d'une page recette (API pas encore appelée)
    it('Should return undefined for an empty array of recipes', () => {
      expect(
        findRecipe(firstSlug)({
          recipes: {
            list: [],
          },
        })
      ).toBeUndefined();
    });
  });
});
