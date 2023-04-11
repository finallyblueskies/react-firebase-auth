import React, { FormEvent, useState } from "react";
import { useAuth } from "./AuthProvider";

const SocialSignIn = () => {
  const { signInWithGoogle, signInWithFacebook, signInWithTwitter } = useAuth();
  const signIn = async (method: () => any) => {
    try {
      await method();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <button onClick={() => signIn(signInWithGoogle)}>
        Sign in with Google
      </button>
      <button onClick={() => signIn(signInWithFacebook)}>
        Sign in with Facebook
      </button>
      <button onClick={() => signIn(signInWithTwitter)}>
        Sign in with Twitter
      </button>
    </>
  );
};
const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useAuth();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await signIn(email, password);
    } catch (e) {
      // Handle sign in errors here
      console.error(e);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        name="email"
        value={email}
        onChange={({ target: { value } }) => setEmail(value)}
        type="text"
        placeholder="Email"
        autoComplete="off"
      />
      <input
        name="password"
        value={password}
        onChange={({ target: { value } }) => setPassword(value)}
        type="password"
        placeholder="Password"
        autoComplete="password"
      />
      <button type="submit">Sign in</button>
    </form>
  );
};

const SignIn = () => (
  <>
    <h1>Sign in</h1>
    <SignInForm />
    <SocialSignIn />
  </>
);

export default SignIn;
