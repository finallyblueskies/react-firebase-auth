import app from 'firebase/app';
import 'firebase/auth';

import { FIREBASE_CONFIG } from "../lib/config";

class Firebase {
  constructor() {
    app.initializeApp(FIREBASE_CONFIG);

    this.auth = app.auth();

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
  }

  /**
   * @method
   * @summary Registers a user
   * @param {string} email
   * @param {string} password
   * @returns {Promise<UserCredential>}
   */
  createUser = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

  /**
   * @method
   * @summary Signs in with a given email and password
   * @param {string} email
   * @param {string} password
   * @returns {Promise<UserCredential>}
   */
  signIn = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

  /**
   * @method
   * @summary Signs in through Google
   * @returns {Promise<UserCredential>}
   */
  signInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  /**
   * @method
   * @summary Signs in through Facebook
   * @returns {Promise<UserCredential>}
   */
  signInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider);

  /**
   * @method
   * @summary Signs in through Twitter
   * @returns {Promise<UserCredential>}
   */
  signInWithTwitter = () => this.auth.signInWithPopup(this.twitterProvider);

  /**
   * @method
   * @summary Signs in through using Google
   * @returns {Promise<UserCredential>}
   */
  signOut = () => this.auth.signOut();

  /**
   * @method
   * @summary Sends a reset password email to a given email
   * @param {string} email
   * @returns {Promise}
   */
  resetPassword = email => this.auth.sendPasswordResetEmail(email);

  /**
   * @method
   * @summary Sends a verification email to the currently logged in user
   * @returns {Promise}
   */
  sendVerificationEmail = () => this.auth.currentUser.sendEmailVerification();

  /**
   * @method
   * @summary Updates the password for the currently logged in user
   * @param {string} password
   * @returns {Promise}
   */
  updatePassword = password => this.auth.currentUser.updatePassword(password);

  /**
   * @method
   * @summary Renders a recaptcha into the given element ID
   * @param {string} id Element ID into which to render the recaptcha
   */
  renderRecaptcha = (id, options = {}) => {
    const recaptcha = new app.auth.RecaptchaVerifier(id, options);
    recaptcha.render();
  };

  /**
   * @method
   * @summary Updates the password for the currently logged in user
   * @param {function} onAuth Executed callback if an authenticated user is present
   * @param {function} onFail Executed callback if no authenticated user is present
   */
  onUserAuthenticated = (onAuth, onFail) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {

        // Get/set user from DB here

        onAuth(authUser);
      } else {
        onFail();
      }
    });
}

export default Firebase;
