import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import axios from 'axios';

import { UserState, UserForm } from '../../@types/user';

export const initialState: UserState = {
  pseudo: null,
  token: null,
  logged: false,
};

export const userLogin = createAsyncThunk(
  'user/login',
  async (userForm: UserForm) => {
    const { data } = await axios.post<UserState>(
      'https://orecipes-api.onrender.com/api/login',
      userForm
    );

    return data;
  }
);

export const userLogout = createAction('user/logout');

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(userLogin.fulfilled, (state, action) => {
      state.pseudo = action.payload.pseudo;
      state.token = action.payload.token;
      state.logged = true;
    })
    .addCase(userLogout, (state) => {
      state.pseudo = null;
      state.token = null;
      state.logged = false;
    });
});

export default userReducer;
