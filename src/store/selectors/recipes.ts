/* eslint-disable import/prefer-default-export */
/* eslint-disable arrow-body-style */

import { RootState } from '..';
// import { Recipe } from '../../@types/recipe';

// export function findRecipe(recipes: Recipe[], searchedSlug: string) {
//   const recipe = recipes.find((testedRecipe) => {
//     return testedRecipe.slug === searchedSlug;
//   });
//   return recipe;
// }

export const findRecipe = (searchedSlug: string) => (state: RootState) =>
  state.recipes.list.find((testedRecipe) => testedRecipe.slug === searchedSlug);
