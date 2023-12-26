import React from 'react';
import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function ProtectedRoute({ element: Component, ...props }) {
  // eslint-disable-next-line react/prop-types
  return props.isLoggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to='/' replace />
  );
}

export default ProtectedRoute;
