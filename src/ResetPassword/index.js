import React, { useState } from 'react';
import { useFirebase } from '../Firebase';

const ResetPasswordForm = () => {

  const [email, setEmail] = useState('');

  const { resetPassword } = useFirebase();

  const onSubmit = async event => {
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
      <button type="submit">
        Reset password
      </button>
    </form>
  );
}

const ResetPassword = () => (
  <>
    <h1>Forgot your password?</h1>
    <p>
      Use the form below to reset it.
    </p>
    <ResetPasswordForm />
  </>
);

export default ResetPassword;
