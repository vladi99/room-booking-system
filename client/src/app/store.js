import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import companyReducer from '../features/company/companySlice';
import roomReducer from '../features/room/roomSlice';
import meetingReducer from '../features/meeting/meetingSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    company: companyReducer,
    room: roomReducer,
    meeting: meetingReducer,
  },
});
