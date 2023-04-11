import { useAuth } from "./AuthProvider";

const SignOut = () => {
  const { signOut } = useAuth();

  signOut();

  return null;
};

export default SignOut;
