import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

import { Recipe } from '../../@types/recipe';

// Pour éviter un cycle de dépendance (store importe reducer qui importe store…)
// je n'importe que les types et interfaces de mon store
import type { RootState } from '..';

interface RecipesState {
  loading: boolean;
  list: Recipe[];
  favorites: Recipe[];
}

export const initialState: RecipesState = {
  loading: true,
  list: [],
  favorites: [],
};

/*
  « Action asynchrone » pour mon appel API
*/
export const fetchRecipes = createAsyncThunk('recipes/fetch', async () => {
  const { data } = await axios.get<Recipe[]>(
    'https://orecipes-api.onrender.com/api/recipes'
  );

  return data;
});

export const fetchFavorites = createAsyncThunk(
  'recipes/favorites',
  async (_, thunkAPI) => {
    // thunkAPI permet notamment d'avoir accès au store
    // et aux méthodes `dispatch` et `getState`
    // → utile pour récupérer `state.user.token` ?
    // console.log(thunkAPI.getState());

    const { token } = (thunkAPI.getState() as RootState).user;

    const { data } = await axios.get<{ favorites: Recipe[] }>(
      'https://orecipes-api.onrender.com/api/favorites',
      {
        // on ajoute le JWT dans les en-têtes de la requête
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data.favorites;
  }
);

const recipesReducer = createReducer(initialState, (builder) => {
  builder
    // .addCase(fetchRecipes.pending, (state, action) => {
    //   state.loading = true;
    // })
    .addCase(fetchRecipes.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    })
    .addCase(fetchRecipes.rejected, (state, action) => {
      state.loading = false;
      // Messaged 'erreur
      alert('ERROR');
    })
    .addCase(fetchFavorites.fulfilled, (state, action) => {
      state.loading = false;
      state.favorites = action.payload;
    })
    .addCase(fetchFavorites.rejected, (state, action) => {
      state.loading = false;
      // Messaged 'erreur
      alert('ERROR');
    });
});

export default recipesReducer;
