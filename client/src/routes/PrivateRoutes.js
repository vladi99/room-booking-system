import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {logout, selectAllowedRoutes, selectCurrentUser} from '../features/auth/authSlice';
import { Navbar } from '../components';
import { Outlet } from 'react-router-dom';

export default function PrivateRoutes() {
  const allowedRoutes = useSelector(selectAllowedRoutes);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <>
      <Navbar links={allowedRoutes} user={currentUser} logOut={logOut} prefix="/app" />
      <Outlet />
    </>
  );
}
