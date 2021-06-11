import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchRooms,
  fetchRoom,
  deleteRoom,
  updateRoom,
  createRoom
} from './roomAPI';
import { FAIL, IDLE, LOADING, SUCCESS } from '../../constants';

const initialState = {
  items: [],
  selected: { },
  status: IDLE,
};

export const fetchRoomsAsync = createAsyncThunk('room/fetchRooms', async (_, { getState }) => {
  const companyId = getState().auth.companyId;
  const res = await fetchRooms(companyId);
  return res.data;
});

export const fetchRoomAsync = createAsyncThunk('room/fetchRoom', async (id, { getState }) => {
  const companyId = getState().auth.companyId;
  const res = await fetchRoom(companyId, id);
  return res.data;
});

export const deleteRoomAsync = createAsyncThunk('room/deleteRoom', async (id, { getState, rejectWithValue }) => {
  try {
    const companyId = getState().auth.companyId;
    const res = await deleteRoom(companyId, id);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
});

export const createRoomAsync = createAsyncThunk('room/createRoom', async (room, { getState, rejectWithValue }) => {
  try {
    const companyId = getState().auth.companyId;
    const res = await createRoom(companyId, room);
    return res.data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
});

export const updateRoomAsync = createAsyncThunk('room/updateRoom', async (room, { getState, rejectWithValue }) => {
  try {
    const companyId = getState().auth.companyId;
    const res = await updateRoom(companyId, room);
    return res.data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
});

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    selectItem(state, action) {
      state.selected = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoomsAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(fetchRoomsAsync.fulfilled, (state, action) => {
        state.status = SUCCESS
        state.items = action.payload;
      })
      .addCase(fetchRoomsAsync.rejected, (state, action) => {
        state.status = FAIL;
      })
      .addCase(fetchRoomAsync.fulfilled, (state, action) => {
        state.selected = action.payload;
      })
      .addCase(updateRoomAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === state.selected.id);
        state.items[index] = action.payload;
        state.selected = action.payload;
      })
      .addCase(createRoomAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteRoomAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(item => state.selected?.id !== item.id);
        state.selected = {};
      })
  },
});

export const selectRooms = (state) => state.room.items;
export const selectRoomStatus = (state) => state.room.status;
export const selectSelectedRoom = (state) => state.room.selected;

export const { selectItem } = roomSlice.actions

export default roomSlice.reducer;
