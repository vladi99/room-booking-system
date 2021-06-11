import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchMeetings,
  fetchMeeting,
  deleteMeeting,
  updateMeeting,
  createMeeting
} from './meetingAPI';
import { FAIL, IDLE, LOADING, SUCCESS } from '../../constants';

const initialState = {
  items: [],
  selected: { },
  status: IDLE,
};

export const fetchMeetingsAsync = createAsyncThunk('meeting/fetchMeetings', async (_, { getState }) => {
  const userId = getState().auth.currentId;
  const res = await fetchMeetings(userId);
  return res.data;
});

export const fetchMeetingAsync = createAsyncThunk('meeting/fetchMeeting', async (id, { getState }) => {
  const userId = getState().auth.currentId;
  const res = await fetchMeeting(userId, id);
  return res.data;
});

export const deleteMeetingAsync = createAsyncThunk('meeting/deleteMeeting', async (id, { getState, rejectWithValue }) => {
  try {
    const userId = getState().auth.currentId;
    const res = await deleteMeeting(userId, id);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
});

export const createMeetingAsync = createAsyncThunk('meeting/createMeeting', async (meeting, { getState, rejectWithValue }) => {
  try {
    const userId = getState().auth.currentId;
    const res = await createMeeting(userId, meeting);
    return res.data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
});

export const updateMeetingAsync = createAsyncThunk('meeting/updateMeeting', async (meeting, { getState, rejectWithValue }) => {
  try {
    const userId = getState().auth.currentId;
    const res = await updateMeeting(userId, meeting);
    return res.data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
});

export const meetingSlice = createSlice({
  name: 'meeting',
  initialState,
  reducers: {
    selectItem(state, action) {
      state.selected = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeetingsAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(fetchMeetingsAsync.fulfilled, (state, action) => {
        state.status = SUCCESS
        state.items.push(...action.payload);
      })
      .addCase(fetchMeetingsAsync.rejected, (state, action) => {
        state.status = FAIL;
      })
      .addCase(fetchMeetingAsync.fulfilled, (state, action) => {
        state.selected = action.payload;
      })
      .addCase(updateMeetingAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === state.selected.id);
        state.items[index] = action.payload;
        state.selected = action.payload;
      })
      .addCase(createMeetingAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteMeetingAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(item => state.selected?.id !== item.id);
        state.selected = {};
      })
  },
});

export const selectMeetings = (state) => state.meeting.items;
export const selectMeetingStatus = (state) => state.meeting.status;
export const selectSelectedMeeting = (state) => state.meeting.selected;

export const { selectItem } = meetingSlice.actions

export default meetingSlice.reducer;
