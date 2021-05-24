import React from 'react';
import { BrowserRouter, Navigate, Route, Routes as RouterRoutes } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import { useSelector } from 'react-redux';
import { selectAllowedRoutes, selectIsLoggedIn } from '../features/auth/authSlice';
import { Login } from '../features/auth';
import { LandingPage } from '../components';

export default function Routes() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const allowedRoutes = useSelector(selectAllowedRoutes);

  return (
    <BrowserRouter>
      <RouterRoutes>
        {isLoggedIn ?
          <>
            <Route path="/app" element={<PrivateRoutes />} >
              {allowedRoutes.map((route) => {
                const { path, component: Component } = route;
                return (
                  <Route key={path} path={path} element={<Component />}/>
                )
              })}
            </Route>
            <Route path="*" element={<Navigate to="/app" />} />
          </>
          :
          <>
            <Route path="login" element={<Login />}/>
            <Route path="" element={<LandingPage />}/>
            <Route path="*" element={<Navigate to="/" />} />
          </>
        }
      </RouterRoutes>
    </BrowserRouter>
  )
}
