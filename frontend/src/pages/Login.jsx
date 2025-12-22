import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      alert("No user found. Please register first");
      return;
    }

    if (
      username === savedUser.username &&
      password === savedUser.password
    ) {
      localStorage.setItem("isLoggedIn", "true");
      //alert("Login successful ✅");
      navigate("/");
    } else {
      alert("Invalid username or password ❌");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <p>
          New user? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
