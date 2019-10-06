import React, { useContext } from 'react';

const FirebaseContext = React.createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export default FirebaseContext;
