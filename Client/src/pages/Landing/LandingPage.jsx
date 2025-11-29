import React from "react";
import { useNavigate } from "react-router-dom";
import ChatWidget from "../../components/ChatWidget/MiniChatBox";
import "./landing.css";
import { Icon } from "@iconify/react";
import playCircleIcon from "@iconify/icons-mdi/play-circle-outline";

import hublyLogo from "../../assets/logos/hubly.png";
import rectangle from "../../assets/logos/rectangle.png";
import msgcard from "../../assets/logos/msgcard.png";
import analytics from "../../assets/logos/analytics.png";
import calendar from "../../assets/logos/calendar.png";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-root">
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
            <button className="secondary-btn watch-btn">
              <Icon icon={playCircleIcon} className="play-icon" />
              Watch Video
            </button>
          </div>
        </div>
        <div className="right-part">
          <img src={rectangle} className="img-main" alt="Main" />
          <img src={msgcard} className="img-small msgcard" alt="msg" />
          <img src={analytics} className="img-small analytics" alt="analytics" />
          <img src={calendar} className="img-small calendar" alt="calendar" />
        </div>
      </div>

      <div className="hero-image">
        <div className="image-placeholder-hero">
          <div className="floating-card card-1">
            <div className="avatar" />
            <div className="text-lines">
              <div className="line short" />
              <div className="line long" />
            </div>
          </div>
          <div className="floating-card card-2">
            <div className="chart-bar" />
            <div className="chart-bar" />
            <div className="chart-bar" />
          </div>
        </div>
      </div>

      <div className="pricing-grid">
        <div className="pricing-card">
          <h3>STARTER</h3>
          <p>Perfect for small teams starting to organize their sales.</p>
          <div className="price">$199 <span>/month</span></div>
          <ul className="features-list">
            <li>✔ 1000 Contacts</li>
            <li>✔ CRM Analytics</li>
            <li>✔ Pipeline Management</li>
            <li>✔ Email Tracking</li>
            <li>✔ 24/7 Knowledge Base</li>
          </ul>
          <a href="#" className="btn btn-outline full-width">Start Free Trial</a>
        </div>
        <div className="pricing-card">
          <h3>GROW</h3>
          <p>Best for growing teams that need advanced automation.</p>
          <div className="price">$399 <span>/month</span></div>
          <ul className="features-list">
            <li>✔ Unlimited Contacts</li>
            <li>✔ Advanced Analytics</li>
            <li>✔ Custom Pipelines</li>
            <li>✔ SMS Marketing</li>
            <li>✔ Dedicated Support</li>
            <li>✔ Salesforce Integration</li>
          </ul>
          <a href="#" className="btn btn-outline full-width">Start Free Trial</a>
        </div>
      </div>

      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <div className="logo">
              <span className="logo-text">Hubly</span>
            </div>
          </div>
          <div className="footer-col">
            <h4>Product</h4>
            <a href="#">Features</a>
            <a href="#">Pricing</a>
            <a href="#">Integrations</a>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Contact</a>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <a href="#">Blog</a>
            <a href="#">Help Center</a>
            <a href="#">Community</a>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>© 2023 Hubly Inc. All rights reserved.</p>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
}
