import React, { useEffect, useState } from 'react';
import { useFirebase } from '../Firebase';
import { Route, Redirect } from "react-router-dom";
import { VERIFY_EMAIL, SIGN_IN, HOME } from "../lib/routes";

const AUTHORIZED = `LOGGED_IN`;
const EMAIL_UNVERIFIED = `EMAIL_UNVERIFIED`;
const UNAUTHORIZED = `UNAUTHORIZED`;
const PENDING = `PENDING`;

const emailUnverified = user =>
  user && !user.emailVerified &&
  user.providerData.map(provider => provider.providerId).includes(`password`);

const AuthRoute = props => {

  const { onUserAuthenticated } = useFirebase();
  const [authState, setAuthState] = useState(PENDING);

  const onAuthSuccess = user => {
    emailUnverified(user)
      ? setAuthState(EMAIL_UNVERIFIED)
      : setAuthState(AUTHORIZED);
  }

  const onAuthFail = () => {
    setAuthState(UNAUTHORIZED);
  }

  const userAuthEffect = () => onUserAuthenticated(onAuthSuccess, onAuthFail);

  useEffect(userAuthEffect, []);

  return <props.children {...{ authState }} />;
}

export const ProtectedRoute = props => {
  return (
    <AuthRoute {...props}>
      {({ authState }) => {
        switch (authState) {
          case (PENDING):
            return null;
          case (EMAIL_UNVERIFIED):
            return <Redirect to={VERIFY_EMAIL} />;
          case (UNAUTHORIZED):
            return <Redirect to={SIGN_IN} />;
          default:
            return <Route {...props} />
        }
      }}
    </AuthRoute>
  )
}

export const UnprotectedRoute = props => {
  return (
    <AuthRoute {...props}>
      {({ authState }) => {
        switch (authState) {
          case (PENDING):
            return null;
          case (AUTHORIZED):
            return <Redirect to={HOME} />;
          case (EMAIL_UNVERIFIED):
            return <Redirect to={VERIFY_EMAIL} />;
          default:
            return <Route {...props} />
        }
      }}
    </AuthRoute>
  )
}

export default ProtectedRoute;
