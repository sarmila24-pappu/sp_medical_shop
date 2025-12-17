import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!username || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    // save user in localStorage
    localStorage.setItem(
      "user",
      JSON.stringify({ username, email, password })
    );

    alert("Registered successfully ✅");
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleRegister}>Register</button>

        <p>
          Already have account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
