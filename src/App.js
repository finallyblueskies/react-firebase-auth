import React from 'react';
import './App.css';

import { Link, Switch, Route, BrowserRouter as Router } from "react-router-dom";
import * as ROUTES from "./lib/routes";

import SignUp from "./SignUp";
import SignOut from "./SignOut";
import SignIn from "./SignIn";
import VerifyEmail from "./VerifyEmail";
import ResetPassword from "./ResetPassword";
import Account from "./Account";

import { ProtectedRoute, UnprotectedRoute } from "./AuthRoute";

export default function App() {
  return (
    <Router>

      <nav>
        <ul>
          <li><Link to={ROUTES.HOME}>Home</Link></li>
          <li><Link to={ROUTES.SIGN_UP}>Sign up</Link></li>
          <li><Link to={ROUTES.SIGN_IN}>Sign in</Link></li>
          <li><Link to={ROUTES.ACCOUNT}>Account</Link></li>
          <li><Link to={ROUTES.RESET_PASSWORD}>Reset password</Link></li>
          <li><Link to={ROUTES.SIGN_OUT}>Sign out</Link></li>
        </ul>
      </nav>

      <Switch>
        <UnprotectedRoute path={ROUTES.SIGN_UP}>
          <SignUp />
        </UnprotectedRoute>
        <UnprotectedRoute path={ROUTES.SIGN_IN}>
          <SignIn />
        </UnprotectedRoute>
        <ProtectedRoute path={ROUTES.ACCOUNT}>
          <Account />
        </ProtectedRoute>
        <UnprotectedRoute path={ROUTES.VERIFY_EMAIL}>
          <VerifyEmail />
        </UnprotectedRoute>
        <UnprotectedRoute path={ROUTES.RESET_PASSWORD}>
          <ResetPassword />
        </UnprotectedRoute>
        <Route path={ROUTES.SIGN_OUT}>
          <SignOut />
        </Route>
        <Route path={ROUTES.HOME}>
          <div>No place like home <span role="img" aria-label="home">🏠</span></div>
        </Route>
      </Switch>
    </Router>
  );
}