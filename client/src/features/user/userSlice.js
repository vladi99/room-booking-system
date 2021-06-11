import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, deleteUser, fetchUser, fetchUserRoles, fetchUsers, updateUser } from './userAPI';
import { FAIL, IDLE, LOADING, SUCCESS } from '../../constants';

const initialState = {
  items: [],
  selected: { },
  roles: [],
  rolesStatus: IDLE,
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

export const deleteUserAsync = createAsyncThunk('user/deleteUser', async (id, { rejectWithValue }) => {
  try {
    const res = await deleteUser(id);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
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

export const fetchUserRolesAsync = createAsyncThunk('user/fetchUserRoles', async () => {
  const res = await fetchUserRoles();
  return res.data;
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
        state.items = action.payload;
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.status = FAIL;
      })
      .addCase(fetchUserRolesAsync.pending, (state) => {
        state.rolesStatus = LOADING;
      })
      .addCase(fetchUserRolesAsync.fulfilled, (state, action) => {
        state.rolesStatus = SUCCESS
        state.roles = action.payload;
      })
      .addCase(fetchUserRolesAsync.rejected, (state, action) => {
        state.rolesStatus = FAIL;
      })
      .addCase(fetchUserAsync.fulfilled, (state, action) => {
        state.selected = action.payload;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === state.selected.id);
        state.items[index] = action.payload;
        state.selected = action.payload;
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(item => state.selected?.id !== item.id);
        state.selected = {};
      })
  },
});

export const selectUsers = (state) => {
  return state.user.items.filter(({ id }) => id !== state.auth.currentId);
}
export const selectUserStatus = (state) => state.user.status;
export const selectSelectedUser = (state) => state.user.selected;
export const selectRoles = (state) => state.user.roles;
export const selectRolesStatus = (state) => state.user.rolesStatus;

export const { selectItem } = userSlice.actions

export default userSlice.reducer;
