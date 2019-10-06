import React from 'react';
import { useFirebase } from '../Firebase';
import { Redirect } from "react-router-dom";

import { HOME } from "../lib/routes";

const SignOut = () => {

  const { signOut } = useFirebase();

  signOut();

  return <Redirect to={HOME} />;
}

export default SignOut;
