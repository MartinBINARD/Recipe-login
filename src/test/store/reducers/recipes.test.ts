import { describe, expect, expectTypeOf, it } from 'vitest';

// j'importe mon unité de code à tester
// → recipesReducer
import recipesReducer, {
  initialState,
  setLoading,
} from '../../../store/reducers/recipes';

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
      const stateLoadingTrue = recipesReducer(initialState, actionLoadingTrue);
      // je teste la valeur retournée → mon state avec `loading` à `true`
      expect(stateLoadingTrue.loading).toBe(true);
    });
  });
});
