import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, fetchUsers } from './userAPI';

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchUsersAsync = createAsyncThunk('user/fetchUsers', async () => {
  const res = await fetchUsers();
  return res.data;
});

export const createUserAsync = createAsyncThunk('user/createUser', async (user, { rejectWithValue }) => {
  try {
    const res = await createUser(user);
    return res.data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items.push(...action.payload);
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
  },
});

export const selectUsers = (state) => state.user.items;
export const selectStatus = (state) => state.user.status;

export default userSlice.reducer;
