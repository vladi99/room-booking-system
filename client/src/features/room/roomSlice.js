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
  selectedCompanies: [],
  status: IDLE,
};

export const fetchRoomsAsync = createAsyncThunk('room/fetchRooms', async () => {
  const res = await fetchRooms();
  return res.data;
});

export const fetchRoomAsync = createAsyncThunk('room/fetchRoom', async (id) => {
  const res = await fetchRoom(id);
  return res.data;
});

export const deleteRoomAsync = createAsyncThunk('room/deleteRoom', async (id) => {
  const res = await deleteRoom(id);
  return res.data;
});

export const createRoomAsync = createAsyncThunk('room/createRoom', async (room, { rejectWithValue }) => {
  try {
    const res = await createRoom(room);
    return res.data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
});

export const updateRoomAsync = createAsyncThunk('room/updateRoom', async (room, { rejectWithValue }) => {
  try {
    const res = await updateRoom(room);
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
        state.items.push(...action.payload);
      })
      .addCase(fetchRoomsAsync.rejected, (state, action) => {
        state.status = FAIL;
      })
      .addCase(fetchRoomAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(fetchRoomAsync.fulfilled, (state, action) => {
        state.status = SUCCESS
        state.selected = action.payload;
      })
      .addCase(fetchRoomAsync.rejected, (state, action) => {
        state.status = FAIL;
      })
      .addCase(updateRoomAsync.pending, (state, action) => {
        state.status = LOADING;
      })
      .addCase(updateRoomAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === state.selected.id);
        state.items[index] = action.payload;
        state.selected = action.payload;
        state.status = SUCCESS;
      })
      .addCase(updateRoomAsync.rejected, (state, action) => {
        state.status = FAIL;
      })
      .addCase(createRoomAsync.pending, (state, action) => {
        state.status = LOADING;
      })
      .addCase(createRoomAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.status = SUCCESS;
      })
      .addCase(createRoomAsync.rejected, (state, action) => {
        state.status = FAIL;
      })
      .addCase(deleteRoomAsync.pending, (state, action) => {
        state.status = LOADING;
      })
      .addCase(deleteRoomAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(item => state.selected?.id !== item.id);
        state.selected = {};
        state.status = SUCCESS;
      })
      .addCase(deleteRoomAsync.rejected, (state, action) => {
        state.status = FAIL;
      })
  },
});

export const selectRooms = (state) => state.room.items;
export const selectRoomStatus = (state) => state.room.status;
export const selectSelectedRoom = (state) => state.room.selected;

export const { selectItem } = roomSlice.actions

export default roomSlice.reducer;
