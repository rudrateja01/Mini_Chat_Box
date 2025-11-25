import React from "react";
import { useNavigate } from "react-router-dom";
import ChatWidget from "../../components/ChatWidget/MiniChatBox";
import "./landing.css";

// Images
import hublyLogo from "../../assets/logos/hubly.png";
import rectangle from "../../assets/logos/rectangle.png";
import msgcard from "../../assets/logos/msgcard.png";
import analytics from "../../assets/logos/analytics.png";
import calendar from "../../assets/logos/calendar.png";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-root">
      {/* NAVBAR */}
      <nav className="landing-navbar">
        <img src={hublyLogo} alt="Hubly Logo" className="nav-logo" />

        <div className="landing-buttons">
          <button className="nav-btn login" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="nav-btn signup" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
      </nav>

      {/* MAIN */}
      <div className="landing-main">
        <div className="left-part">
          <h1>
            Grow Your Business Faster <br /> with Hubly CRM
          </h1>
          <p>
            Manage leads, automate workflows, and close deals effortlessly — all
            in one powerful platform.
          </p>

          <div className="main-btn-group">
            <button className="primary-btn">Get Started ➜</button>
            <button className="secondary-btn">Watch Video</button>
          </div>
        </div>

        <div className="right-part">
          <img src={rectangle} className="img-main" alt="Main" />
          <img src={msgcard} className="img-small msgcard" alt="msg" />
          <img src={analytics} className="img-small analytics" alt="analytics" />
          <img src={calendar} className="img-small calendar" alt="calendar" />
        </div>
      </div>

      <ChatWidget />
    </div>
  );
}
