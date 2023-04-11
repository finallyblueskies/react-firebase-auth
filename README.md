# React-Firebase Authentication Template

Easily set up a Firebase authentication system with this Create React App starter template, ideal for client-only projects that require quick authentication implementation.

## Getting Started

- `git clone https://github.com/notbogdan/react-firebase-auth.git`
- `cd react-firebase-auth`
- `yarn install`
- Create a `.env.local` from `.env.template`
- Populate `.env.local` fields with Firebase config
- Ready to start developing - `yarn start`

## Features

This template includes essential components for building a website with authentication:

- Preconfigured routes and functions for sign in, sign up, email verification, password reset, account details, and password change
- Authenticated user-only routes
- Public routes accessible only when user is not logged in
- Captcha validation during sign up
- Single Sign-On (SSO) support for Twitter, Facebook, and Google
- Auth Provider offering Firebase's API for easy integration with user state and methods like sign in, sign up, and password reset
