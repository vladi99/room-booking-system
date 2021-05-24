import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import companyReducer from '../features/company/companySlice';
import roomReducer from '../features/room/roomSlice';
import meetingReducer from '../features/meeting/meetingSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    company: companyReducer,
    room: roomReducer,
    meeting: meetingReducer,
    auth: authReducer,
  },
});
