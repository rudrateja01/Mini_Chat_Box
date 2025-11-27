// Login.jsx
import "./Style.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
import man from "../../assets/logos/man.png";

import useLogin from "../../Hooks/useLogin";

export default function Login() {
  // const { login } = useAuth();
  const { login, error } = useLogin();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password); 
      navigate("/admin");   // 🔥 dashboard route
    } catch (err) {
      alert(err.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="left">
        <form onSubmit={handleSubmit}>
          <h2>Sign in to your Plexify</h2>

          <div className="field">
            <label>Username</label>
            <input 
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Log in</button>

          <p>
            Don't have an account?{" "}
            <span onClick={() => navigate("/signup")} className="signup-link">
              Sign up
            </span>
          </p>
        </form>
      </div>

      <div className="right">
        <img src={man} alt="login" />
      </div>
    </div>
  );
}
