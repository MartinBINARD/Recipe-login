import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import axios from 'axios';

interface UserState {
  // logged: boolean;
  pseudo: string | null;
}
export const initialState: UserState = {
  // la propriété d'état `logged` est redondante avec `pseudo` :
  // quand on est connecté : pseudo est non nul
  // sinon, il est nul
  // logged: false,
  pseudo: null,
};

export const logout = createAction('user/logout');

export const login = createAsyncThunk(
  'user/login',
  async (formData: FormData) => {
    const objData = Object.fromEntries(formData);

    const { data } = await axios.post(
      'https://orecipes-api.onrender.com/api/login',
      objData
    );

    return data as {
      logged: boolean;
      pseudo: string;
      token: string;
    };
  }
);

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.fulfilled, (state, action) => {
      // state.logged = true;
      state.pseudo = action.payload.pseudo;
    })
    .addCase(logout, (state) => {
      state.pseudo = null;
    });
});

export default userReducer;
