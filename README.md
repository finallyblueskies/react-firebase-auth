# 🔥 react-firebase-auth
A minimalistic React + Firebase + Firebase Auth boilerplate project, built on top of [create-react-app](https://github.com/facebook/create-react-app).
This starter was inspired by the excellent [boilerplate](https://github.com/the-road-to-react-with-firebase/react-firebase-authentication) by [@rwieruch](https://github.com/rwieruch). Unfortunately it was a little too detailed for what I would consider to be the perfectly streamlined auth boilerplate, so I set out to make my own rendition.

## Quick start

* `git clone https://github.com/notbogdan/react-firebase-auth.git`
* `cd react-firebase-auth`
* `yarn install`
* If you want to make sure create-react-app's dependencies are up to date, you can run `yarn upgrade react-scripts@latest`
* Add your Firebase config to `src/lib/config.js`
* `yarn start` 

## Overview 

Key differences of this project from [@rwierch](https://github.com/rwieruch)'s implementation include:
* Written with Hooks
* No Firebase Database integration
* Simpler auth routing
* Simpler initial Firebase config
* Firebase [recaptcha integration](https://firebase.google.com/docs/reference/js/firebase.auth.RecaptchaVerifier) for the Sign Up flow

If you want a good example on how to integrate this project's authentication logic with Firebase's database solutions, I would recommend checking out the original [project](https://github.com/the-road-to-react-with-firebase/react-firebase-authentication).

This project aims to make as few assumptions about your preferences for building applications as possible. That means there is:
* No styling
* No form validation or error handling
* No non create-react-app dependencies other than `react-router-dom` and `firebase`
* No tests

## Features

This project does contain the basic sign in/sign up and auxilliary authentication functionality split into the following pages:

* Sign In (including links for Google, Facebook and Twitter SSO)
* Sign Up
* Verify Email
* Reset Password
* Account & password change

It does take a slightly opinionated approach to implementing authentication flows, mostly in the form of these two components:

- `<ProtectedRoute>` will not allow unauthenticated users to view the route. They will be redirected to the homepage. The only page that makes use of this route is the Account page.
- `<UnprotectedRoute>` will allow unauthenticated users to view the route, however authenticated users will be redirected away the homepage. The Sign Up, Sign In, Verify Email and Reset Password page use this route.

Both of these routes will redirect a logged in user with an unverified email to the Verify Email page. The Sign Up page also implements a recaptcha which will appear when a user submits the form. The user will be registered once the captcha is completed.

## Project structure

```
src/
|- lib/
|-- config.js     // Firebase config located here
|-- routes.js     // Contains routes for the application
|- Account/       // Account and reset password page
|- AuthRoute/     // Exports the ProtectedRoute/UnprotectedRoute components
|- Firebase/      // Exports the useFirebase() hook and Firebase context provider
|- ResetPassword/ // Reset password page
|- SignIn/        // Sign In page
|- SignOut/       // Sign Out page
|- SignUp/        // Sign Up page
|- VerifyEmail/   // Verify Email page
|- App.js         // Main app container
|- index.js       // Entry point, Firebase provider + App integration
```

## Go build something!

Thanks for checking this guy out. PR's/suggestions/improvements are highly welcome. 

___

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

