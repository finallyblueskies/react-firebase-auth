import { useState, useRef, FormEvent } from "react";

import { useAuth } from "./AuthProvider";

const SignUpForm = () => {
  const [username, setUsername] = useState(``);
  const [email, setEmail] = useState(``);
  const [passwordOne, setPasswordOne] = useState(``);
  const [passwordTwo, setPasswordTwo] = useState(``);

  const { createUser, sendVerificationEmail, signIn, renderRecaptcha } =
    useAuth();
  const captchaRef = useRef<HTMLDivElement | null>(null);

  const signUp = async () => {
    captchaRef.current!.innerHTML = ``;
    try {
      await createUser(email, passwordOne);
      await signIn(email, passwordOne);
      await sendVerificationEmail();
    } catch (e) {
      // Handle sign up errors here
      console.error(e);
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    renderRecaptcha(captchaRef.current!, { callback: signUp });
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        name="username"
        value={username}
        onChange={({ target: { value } }) => setUsername(value)}
        type="text"
        placeholder="Username"
        autoComplete="off"
      />
      <input
        name="email"
        value={email}
        onChange={({ target: { value } }) => setEmail(value)}
        type="text"
        placeholder="Email Address"
        autoComplete="email"
      />
      <input
        name="passwordOne"
        value={passwordOne}
        onChange={({ target: { value } }) => setPasswordOne(value)}
        type="password"
        placeholder="Password"
        autoComplete="new-password"
      />
      <input
        name="passwordTwo"
        value={passwordTwo}
        onChange={({ target: { value } }) => setPasswordTwo(value)}
        type="password"
        placeholder="Confirm Password"
        autoComplete="new-password"
      />
      <button type="submit">Sign Up</button>
      <div ref={captchaRef} />
    </form>
  );
};

const SignUp = () => (
  <>
    <h1>SignUp</h1>
    <SignUpForm />
  </>
);

export default SignUp;
