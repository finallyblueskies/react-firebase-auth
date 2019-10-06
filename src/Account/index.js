import React, { useState } from "react";
import { useFirebase } from "../Firebase";

const ChangePasswordForm = () => {
  const { updatePassword } = useFirebase();
  const [passwordOne, setPasswordOne] = useState(``);
  const [passwordTwo, setPasswordTwo] = useState(``)

  const onSubmit = async event => {
    event.preventDefault();
    try {
      await updatePassword(passwordOne);
    } catch (e) {
      // Handle errors here
      console.log(e);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        name="passwordOne"
        value={passwordOne}
        onChange={({ target: { value } }) => setPasswordOne(value)}
        type="password"
        placeholder="Password"
        autoComplete="off"
      />
      <input
        name="passwordTwo"
        value={passwordTwo}
        onChange={({ target: { value } }) => setPasswordTwo(value)}
        type="password"
        placeholder="Repeat password"
        autoComplete="off"
      />
      <button type="submit">
        Change password
      </button>
    </form>
  );
};

const Account = () => {
  const { auth: { currentUser } } = useFirebase();
  return (
    <>
      <h1>Hello {currentUser.displayName}!</h1>
      <h3>Email</h3>
      {currentUser.email}
      <h3>Change password</h3>
      <ChangePasswordForm />
    </>
  );
};

export default Account;