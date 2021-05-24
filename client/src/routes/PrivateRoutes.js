import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectAllowedRoutes } from '../features/auth/authSlice';
import { Navbar } from '../components';
import { Outlet } from 'react-router-dom';

export default function PrivateRoutes() {
  const allowedRoutes = useSelector(selectAllowedRoutes);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <>
      <Navbar links={allowedRoutes} logOut={logOut} prefix="/app" />
      <Outlet />
    </>
  );
}
