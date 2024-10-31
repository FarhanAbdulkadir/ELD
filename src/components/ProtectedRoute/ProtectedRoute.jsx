import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from '../LoginPage/LoginPage';

function ProtectedRoute({ component: Component, ...rest }) {
  const user = useSelector((store) => store.user);

  return (
    <Route
      {...rest}
      render={(props) =>
        user.id ? (
          user.Roles === 0 ? (
            <Redirect to="/driver-dashboard" />
          ) : user.Roles === 1 ? (
            <Redirect to="/dispatcher-dashboard" />
          ) : (
            <Component {...props} />
          )
        ) : (
          <LoginPage />
        )
      }
    />
  );
}

export default ProtectedRoute;
