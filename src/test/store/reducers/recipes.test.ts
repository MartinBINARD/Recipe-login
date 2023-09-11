import { describe, expect, expectTypeOf, it } from 'vitest';

// j'importe mon unité de code à tester
// → recipesReducer
import recipesReducer, {
  fetchRecipes,
  initialState,
  setLoading,
} from '../../../store/reducers/recipes';

import { Recipe } from '../../../@types/recipe';

import data from '../../../data';

describe('Recipes Reducer', () => {
  describe('Structure', () => {
    it('Should be a function', () => {
      expectTypeOf(recipesReducer).toBeFunction();
    });

    it('Should return an object', () => {
      // mon reducer DOIT avoir 2 arguments :
      //   - state
      //   - action
      expectTypeOf(
        recipesReducer(undefined, { type: '__TEST__' })
      ).toBeObject();
    });
  });

  describe('Execution', () => {
    it('Should return the initial state on first call', () => {
      // au 1er appel, il doit retourner mon état initial
      // → je l'importe
      expect(recipesReducer(undefined, { type: '@@INIT' })).toBe(initialState);
    });

    describe('Action', () => {
      it('Should handle setLoading', () => {
        // je génère mon action pour avoir mon objet action
        const actionLoadingFalse = setLoading(false);
        // j'appelle mon reducer
        const stateLoadingFalse = recipesReducer(
          initialState,
          actionLoadingFalse
        );

        // expect(stateLoadingFalse).toBe({
        //   ...initialState,
        //   loading: false,
        // }); // FAIL

        /*
          Par contre, attention à la comparaison d'objets :
  
          const user1 = { name: 'Dave' };
          const user2 = { name: 'Dave' };
  
          const admin = user1;
  
          // Comparaison de surface
          user1 === user2 → false
          user1 === admin → true
  
          // Comparaison en profondeur
          user1 === user2 → true (ils ont les même valeurs)
          user1 === admin → true
  
          Dans nos tests :
          expect({ loading: true, list: [], favorites: [] })
            .toBe(initialState); // FAIL → 2 références différentes
  
          expect({ loading: trie, list: [], favorites: [] })
            .toEqual(initialState); // PASS → même valeurs
        */
        expect(stateLoadingFalse).toEqual({
          ...initialState,
          loading: false,
        });

        // on peut aussi tester uniquement la valeur modifiée
        // je teste la valeur retournée → mon state avec `loading` à `false`
        expect(stateLoadingFalse.loading).toBe(false);

        // je teste l'action inverse
        const actionLoadingTrue = setLoading(true);
        // j'appelle mon reducer
        const stateLoadingTrue = recipesReducer(
          initialState,
          actionLoadingTrue
        );
        // je teste la valeur retournée → mon state avec `loading` à `true`
        expect(stateLoadingTrue.loading).toBe(true);
      });
    });

    describe('Thunk', () => {
      // je veux tester si mon reducer gère bien mon thunk `fetchRecipe`
      // il englobe 3 _action creators_ (fulfilled, rejected, pending)
      it('Should handle fetchRecipe.fulfilled', () => {
        // je dois créer mon action → on simule le dispatch
        // j'ai besoin :
        //   - payload : données retournées par mon API
        //     → je peux mettre des infos « bidons » : le principal
        //       est de retrouver ces infos dans mon state final
        //   - un `requestId` (généré par Toolkit)
        //     → je lui donne un faux ID, le principal est de lui en donner un
        // const fakePayload = [{ fakeRecipe: 'testing' }];
        const fakePayload: Recipe[] = data;
        const fakeRequestId = 'id123456fake';
        // je génère mon action
        const action = fetchRecipes.fulfilled(fakePayload, fakeRequestId);
        // TS râle mais c'est pas grave ici…

        // console.log(action);

        // j'exécute mon reducer en lui donnant un state et mon action générée
        const state = recipesReducer(initialState, action);
        // console.log(initialState);
        // console.log(state);

        // je teste le nouveau state :
        //   - `loading` doit être `false`
        //   - `list` qui doit correspondre à `fakePayload` (= résultat API = payload)

        // soit l'objet entier
        expect(state).toEqual({
          ...initialState,
          loading: false,
          list: fakePayload,
        });

        // soit propriété par propriété
        expect(state.loading).toBe(false);
        // identique à :
        // > https://vitest.dev/api/expect.html
        expect(state).toHaveProperty('loading', false);

        expect(state.list).toEqual(fakePayload);
        // identique à :
        expect(state).toHaveProperty('list', fakePayload);
      });
    });
  });
});
