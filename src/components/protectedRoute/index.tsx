import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';

const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const authContext = useContext(AuthContext);
  const location = useLocation();

  if (!authContext || !authContext.token) {
    return <Navigate to="/login" replace state={{ intent: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;