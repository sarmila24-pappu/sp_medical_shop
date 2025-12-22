import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Topbar.css";

function Topbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (loggedIn && storedUser) {
      setUser(storedUser);
    } else {
      setUser(null);
    }
  }, []);

  return (
    <div className="topbar">
      <h1>SP Medical Shop</h1>

      <div className="topbar-auth">
        {user ? (
          <span>Welcome, {user.username}</span>
        ) : (
          <>
            <Link to="/login">Login</Link> |{" "}
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Topbar;
