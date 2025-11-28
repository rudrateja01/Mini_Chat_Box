import "./LoginStyle.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../../Hooks/useLogin";
import man from "../../assets/logos/man.png";
import Hubly from "../../assets/logos/hubly.png";

export default function Login() {
  const { login, error } = useLogin();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/admin");
    } catch (err) {
      alert(err.message || "Login failed");
    }
  };

  return (
    <div className="container">
      {/* Left Panel */}
      <div className="left-panel">
        <div className="logo">
          <span className="logo-text"><img src={Hubly} alt="" /></span>
        </div>

        {/* Scrollable Form Wrapper */}
        <div className="form-scroll-wrapper">
          <div className="form-container">
            <div className="form-header">
              <h1>Sign in to your plexity</h1>
            </div>
            <form onSubmit={handleSubmit}>
              {/* form groups */}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Username</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="submit-btn">
                  Log in
                </button>
              </form>
            </form>
            {error && <p className="error-msg">{error}</p>}
          </div>
          <p className="signup-text">
            Don't have an account?{" "}
            <span onClick={()=>navigate("/signup")}>signup</span>
          </p>
        </div>

        {/* Footer always at bottom */}
        <div className="footer-text">
          This site is protected by reCAPTCHA and the Google{" "}
          <span>Privacy Policy</span> and <span>Terms of Service</span>{" "}
          apply.
        </div>
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        <img src={man} alt="Man working on laptop" className="feature-image" />
      </div>
    </div>
  );
}
