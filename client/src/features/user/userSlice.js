import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, deleteUser, fetchUser, fetchUsers, updateUser } from './userAPI';
import { FAIL, IDLE, LOADING, SUCCESS } from '../../constants';

const initialState = {
  items: [],
  selected: { },
  status: IDLE,
};

export const fetchUsersAsync = createAsyncThunk('user/fetchUsers', async () => {
  const res = await fetchUsers();
  return res.data;
});

export const fetchUserAsync = createAsyncThunk('user/fetchUser', async (id) => {
  const res = await fetchUser(id);
  return res.data;
});

export const deleteUserAsync = createAsyncThunk('user/deleteUser', async (id) => {
  const res = await deleteUser(id);
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

export const updateUserAsync = createAsyncThunk('user/updateUser', async (user, { rejectWithValue }) => {
  try {
    const res = await updateUser(user);
    return res.data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    selectItem(state, action) {
      state.selected = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.status = SUCCESS
        state.items.push(...action.payload);
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.status = FAIL;
      })
      .addCase(fetchUserAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(fetchUserAsync.fulfilled, (state, action) => {
        state.status = SUCCESS
        state.selected = action.payload;
      })
      .addCase(fetchUserAsync.rejected, (state, action) => {
        state.status = FAIL;
      })
      .addCase(updateUserAsync.pending, (state, action) => {
        state.status = LOADING;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === state.selected.id);
        state.items[index] = action.payload;
        state.selected = action.payload;
        state.status = SUCCESS;
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.status = FAIL;
      })
      .addCase(createUserAsync.pending, (state, action) => {
        state.status = LOADING;
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.status = SUCCESS;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = FAIL;
      })
      .addCase(deleteUserAsync.pending, (state, action) => {
        state.status = LOADING;
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(item => state.selected?.id !== item.id);
        state.selected = {};
        state.status = SUCCESS;
      })
      .addCase(deleteUserAsync.rejected, (state, action) => {
        state.status = FAIL;
      })
  },
});

export const selectUsers = (state) => state.user.items;
export const selectUserStatus = (state) => state.user.status;
export const selectSelectedUser = (state) => state.user.selected;

export const { selectItem } = userSlice.actions

export default userSlice.reducer;
