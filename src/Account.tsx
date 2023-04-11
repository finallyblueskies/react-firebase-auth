import { FormEvent, useState } from "react";
import { useAuth } from "./AuthProvider";

const ChangePasswordForm = () => {
  const { updatePassword } = useAuth();
  const [passwordOne, setPasswordOne] = useState(``);
  const [passwordTwo, setPasswordTwo] = useState(``);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
      <button type="submit">Change password</button>
    </form>
  );
};

const Account = () => {
  const { user } = useAuth();
  if (!user) throw new Error("Account - User not found");
  return (
    <>
      <h1>Hello {user.displayName}!</h1>
      <h3>Email</h3>
      {user.email}
      <h3>Change password</h3>
      <ChangePasswordForm />
    </>
  );
};

export default Account;
