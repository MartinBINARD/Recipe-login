import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

import axiosInstance from '../../utils/axios';

import { Recipe } from '../../@types/recipe';

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
  const { data } = await axiosInstance.get<Recipe[]>('/recipes');

  return data;
});

export const fetchFavorites = createAsyncThunk(
  'recipes/favorites',
  async () => {
    const { data } = await axiosInstance.get<{ favorites: Recipe[] }>(
      '/favorites'
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
