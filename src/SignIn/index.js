import React, { useState } from 'react';
import { useFirebase } from '../Firebase';

const SocialSignIn = () => {
  const { signInWithGoogle, signInWithFacebook, signInWithTwitter } = useFirebase();
  
  const signIn = async method => {
    try {
      await method();
    } catch(e) {
      console.error(e);
    }
  };

  return (
    <>
      <button onClick={() => signIn(signInWithGoogle)}>Sign in with Google</button>
      <button onClick={() => signIn(signInWithFacebook)}>Sign in with Facebook</button>
      <button onClick={() => signIn(signInWithTwitter)}>Sign in with Twitter</button>
    </>
  );
}
const SignInForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useFirebase();

  const onSubmit = async event => {
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
      <button type="submit">
        Sign in
      </button>
    </form>
  );
}

const SignIn = () => (
  <>
    <h1>Sign in</h1>
    <SignInForm />
    <SocialSignIn />
  </>
);

export default SignIn;
