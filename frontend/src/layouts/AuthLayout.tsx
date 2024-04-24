import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Header from '../components/header/Header';

interface WithAuthProps {
  children?: React.ReactNode; // Define the type for children (any React Node)
}

const AuthLayout: React.FC<WithAuthProps> = ({ children }) => {
  const isLoggedIn = localStorage.getItem('userInfo');

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header />
      {children}
      <Outlet />
    </>
  );
};

export default AuthLayout;
