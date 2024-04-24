import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface WithAuthProps {
  children: React.ReactNode; // Define the type for children (any React Node)
}

const AuthLayout: React.FC<WithAuthProps> = (children)  => {
  const isLoggedIn = localStorage.getItem('useInfo');

  return (
    <>
      {isLoggedIn ? (
        <>
          {children}
          <Outlet />
        </>
      ) : <Navigate to="/login" />}
    </>
  )
};

export default AuthLayout;
