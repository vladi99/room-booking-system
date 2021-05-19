import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import companyReducer from '../features/company/companySlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    company: companyReducer,
  },
});
