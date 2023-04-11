import { FormEvent, useState } from "react";
import { useAuth } from "./AuthProvider";

const VerifyEmailForm = () => {
  const [email, setEmail] = useState("");

  const { sendVerificationEmail } = useAuth();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await sendVerificationEmail();
    } catch (e) {
      // Handle errors here
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
      <button type="submit">Send verification email</button>
    </form>
  );
};

const VerifyEmail = () => (
  <>
    <h1>Verify your email.</h1>
    <p>
      If you did not receive a verification link, you can use the form below to
      resend it.
    </p>
    <VerifyEmailForm />
  </>
);

export default VerifyEmail;
