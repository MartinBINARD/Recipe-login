/*
  Les tests n'ont pas besoin d'être rangés dans un dossier
  particulier (c'est comme le dev veut).
  Par contre, les fichiers tests doivent OBLIGATOIREMENT respecter
  un nommage :

  "include: fichier.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}
*/

import { describe, expect, expectTypeOf, it } from 'vitest';
import sum from './example-sum';

/*
  Permet d'organiser nos tests sous forme de « chapitres »

  ça prend comme arguments :

    - un nom
    - une factory (un callback) → ce que l'on fait
*/
describe('Sum function', () => {
  // suite de tests
  // describe('Sous-chapitre') → « sous-chapitres »

  describe('Structure', () => {
    /*
      Définit un ensemble d'attentes à tester

      2 fonctions qui font la même chose : `test` et son alias `it`

      Syntaxe :
        test(name, () => {
          // attentes à tester
        });
        it(name, () => {
          // attentes à tester
        });

      > https://vitest.dev/api/#test
    */
    it('Should be a function', () => {
      /*
        on retrouve ici nos attentes exprimées sous forme d'**assertions** ;

        assertion : expression évaluée à vrai

          - « je m'attends à ce que 2 + 3 soit égal à 5 »
          - « je m'attends à ce que 2 + 5 ne soit pas égal à 5 »

        Syntaxe :
        expect(inputValue).[matcher](expectedValue)

        Exemples :
        expect(2 + 3).toBe(5)
        expect(2 + 5).not.toBe(5)
        expect(2 === 3).toEqual(false)
        
        > https://vitest.dev/api/expect.html
      */

      // expect(valeur calculée).toBe(valeur attendue)
      // je m'attends à ce que le type de `sum` soit une fonction
      expect(typeof sum).toBe('function');

      /*
        **NOTE**

        si on veut tester le type d'une fonction, d'une variable (d'une unité)
         ex : expect(typeof sum).toBe('function'),

        on utilisera plus souvent `expectTypeOf`
        expectTypeOf(sum).toBeFunction()

        > https://vitest.dev/api/expect-typeof.html
      */
      expectTypeOf(sum).toBeFunction();
    });
  });

  // describe('Execution', () => {});
});
