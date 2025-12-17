import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Topbar.css";

function Topbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // 🔥 THIS IS THE KEY
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (loggedIn && storedUser) {
      setUser(storedUser);
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="topbar">
      <h2>SP Medical Shop</h2>

      <div className="topbar-auth">
        {user ? (
          <>
            <span>Welcome, {user.username}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
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
