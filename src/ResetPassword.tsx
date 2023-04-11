import { FormEvent, useState } from "react";
import { useAuth } from "./AuthProvider";

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");

  const { resetPassword } = useAuth();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await resetPassword(email);
    } catch (e) {
      // Handle erros here
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
      <button type="submit">Reset password</button>
    </form>
  );
};

const ResetPassword = () => (
  <>
    <h1>Forgot your password?</h1>
    <p>Use the form below to reset it.</p>
    <ResetPasswordForm />
  </>
);

export default ResetPassword;
