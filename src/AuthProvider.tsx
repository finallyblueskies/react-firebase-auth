import { User } from "firebase/auth";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import Firebase from "./Firebase";

type AuthState = {
  user: User | null;
  signIn: typeof Firebase.prototype.signIn;
  createUser: typeof Firebase.prototype.createUser;
  signInWithGoogle: typeof Firebase.prototype.signInWithGoogle;
  signInWithFacebook: typeof Firebase.prototype.signInWithFacebook;
  signInWithTwitter: typeof Firebase.prototype.signInWithTwitter;
  signOut: typeof Firebase.prototype.signOut;
  resetPassword: typeof Firebase.prototype.resetPassword;
  sendVerificationEmail: typeof Firebase.prototype.sendVerificationEmail;
  updatePassword: typeof Firebase.prototype.updatePassword;
  renderRecaptcha: typeof Firebase.prototype.renderRecaptcha;
  onUserAuthenticated: typeof Firebase.prototype.onUserAuthenticated;
};
const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const firebase = useMemo(() => new Firebase(), []);
  const [user, setUser] = useState<AuthState["user"]>(null);

  useEffect(() => {
    const unsubscribe = firebase.onUserAuthenticated(
      (authUser) => setUser(authUser),
      () => setUser(null)
    );
    return () => {
      unsubscribe();
    };
  }, [firebase]);

  const signIn = firebase.signIn;
  const createUser = firebase.createUser;
  const signInWithGoogle = firebase.signInWithGoogle;
  const signInWithFacebook = firebase.signInWithFacebook;
  const signInWithTwitter = firebase.signInWithTwitter;
  const signOut = firebase.signOut;
  const resetPassword = firebase.resetPassword;
  const sendVerificationEmail = firebase.sendVerificationEmail;
  const updatePassword = firebase.updatePassword;
  const renderRecaptcha = firebase.renderRecaptcha;
  const onUserAuthenticated = firebase.onUserAuthenticated;

  const value = {
    user,
    signIn,
    createUser,
    signInWithGoogle,
    signInWithFacebook,
    signInWithTwitter,
    signOut,
    resetPassword,
    sendVerificationEmail,
    updatePassword,
    renderRecaptcha,
    onUserAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
