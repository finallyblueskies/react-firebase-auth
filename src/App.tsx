import "./App.css";
import { Link, useOutlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

function App() {
  const outlet = useOutlet();
  const { user, signOut } = useAuth();
  return (
    <div>
      <h1>React Router Auth</h1>
      <p>
        {user ? (
          <>
            Welcome {user.email}! <button onClick={signOut}>Log out</button>
            <Link to="/account">Profile</Link>
          </>
        ) : (
          <>
            No user authenticated.
            <Link to="/login">Log in</Link>
            <Link to="/register">Register</Link>
            <Link to="/reset-password">Reset password</Link>
          </>
        )}
      </p>
      {outlet}
    </div>
  );
}

export default App;
