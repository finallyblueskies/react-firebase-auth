import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { AuthProvider } from "./AuthProvider";
import { PrivateRoute, PublicRoute } from "./RouteHelpers";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Account from "./Account";
import ResetPassword from "./ResetPassword";
import VerifyEmail from "./VerifyEmail";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="account" element={<Account />} />
        <Route path="verify-email" element={<VerifyEmail />} />
      </Route>
      <Route path="/" element={<PublicRoute />}>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>
    </Route>
  )
);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
