import { initializeApp } from "firebase/app";
import {
  Auth,
  User,
  getAuth,
  signOut,
  updateEmail,
  updatePassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  FacebookAuthProvider,
  TwitterAuthProvider,
  RecaptchaVerifier,
  signInWithPopup,
} from "firebase/auth";

export const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

class Firebase {
  auth: Auth;
  googleProvider: GoogleAuthProvider;
  facebookProvider: FacebookAuthProvider;
  twitterProvider: TwitterAuthProvider;

  constructor() {
    this.auth = getAuth(app);

    this.googleProvider = new GoogleAuthProvider();
    this.facebookProvider = new FacebookAuthProvider();
    this.twitterProvider = new TwitterAuthProvider();
  }

  createUser = (email: string, password: string) =>
    createUserWithEmailAndPassword(this.auth, email, password);

  signIn = (email: string, password: string) =>
    signInWithEmailAndPassword(this.auth, email, password);

  signOut = () => signOut(this.auth);

  signInWithGoogle = () => signInWithPopup(this.auth, this.googleProvider);
  signInWithFacebook = () => signInWithPopup(this.auth, this.facebookProvider);
  signInWithTwitter = () => signInWithPopup(this.auth, this.twitterProvider);

  resetPassword = (email: string) => sendPasswordResetEmail(this.auth, email);

  sendVerificationEmail = (newEmail?: string) =>
    updateEmail(
      this.auth.currentUser!,
      newEmail || this.auth.currentUser!.email!
    );

  updatePassword = (password: string) =>
    updatePassword(this.auth.currentUser!, password);

  renderRecaptcha = (element: HTMLElement, options = {}) => {
    const recaptcha = new RecaptchaVerifier(element, options, this.auth);
    recaptcha.render();
  };

  onUserAuthenticated = (onAuth: (auth: User) => void, onFail: () => void) =>
    this.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        onAuth(authUser);
      } else {
        onFail();
      }
    });
}

export default Firebase;
