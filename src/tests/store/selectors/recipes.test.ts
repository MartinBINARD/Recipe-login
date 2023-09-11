/*
  Pratiquer le TDD

  On pose la problématique :
  on veut ajouter un titre sur la home en fonction du nombre de recettes

  Construction du selector en TDD
  - Respect des 3 lois et du cycle du TDD !

  Les titres en fonction du nombre de recettes :

  - 0 ou pas d'argument donné à la fonction → Découvrez prochainement nos recettes.
  - 1 → Découvrez notre recette préférée.
  - 2+ → Découvrez nos X recettes.

  Naming ? `getTitleByRecipesNumber`
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
