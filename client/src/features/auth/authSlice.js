import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login } from './authAPI';
import { privateRouteConfig } from '../../config'
import axios from 'axios';

const key = 'user';

const initialState = {
  isLoggedIn: false,
  current: null,
  isLoading: false,
  companyId: null,
  currentId: null
}

const current = JSON.parse(localStorage.getItem(key));
if (current) {
  axios.defaults.headers.common['x-access-token'] = current.accessToken;
  initialState.isLoggedIn = true;
  initialState.current = current;
  initialState.companyId = current.companyId;
  initialState.currentId = current.id;
}

export const loginAsync = createAsyncThunk('auth/login', async (user, { rejectWithValue }) => {
  try {
    const res = await login(user);
    localStorage.setItem(key, JSON.stringify(res.data));
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem(key);
      state.isLoggedIn = false;
      state.current = null;
      state.currentId = null;
      state.companyId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.current = action.payload;
        axios.defaults.headers.common['x-access-token'] = action.payload.accessToken;
        state.companyId = action.payload.companyId;
        state.currentId = action.payload.id;
        state.isLoading = false;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.current = null;
        state.currentId = null;
        state.companyId = null;
        state.isLoading = false;
      })
  },
});

export const selectCurrentUser = (state) => state.auth.current;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectCurrentCompanyId = (state) => state.auth.companyId;
export const selectCurrentId = (state) => state.auth.currentId;
export const selectAllowedRoutes = (state) => {
  const roles = state.auth.current?.roles;
  if(!roles) return [];
  return privateRouteConfig.filter(({ permission }) => {
    if(!permission) return true;
    else return permission.some(value => roles.some(({name}) => name === value));
  });
}


export const { logout } = authSlice.actions

export default authSlice.reducer;
