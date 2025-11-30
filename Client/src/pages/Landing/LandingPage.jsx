// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ChatWidget from "../../components/ChatWidget/MiniChatBox";
// import "./landing.css";
// import { Icon } from "@iconify/react";
// import playCircleIcon from "@iconify/icons-mdi/play-circle-outline";
// import closeIcon from "@iconify/icons-mdi/close";

// import hublyLogo from "../../assets/logos/hubly.png";
// import rectangle from "../../assets/logos/rectangle.png";
// import msgcard from "../../assets/logos/msgcard.png";
// import analytics from "../../assets/logos/analytics.png";
// import calendar from "../../assets/logos/calendar.png";
// import company from "../../assets/logos/Company.png";
// import elastic from "../../assets/logos/elastic.png";
// import operdoor from "../../assets/logos/opendoor.png";
// import airtable from "../../assets/logos/airtable.png";
// import framer from "../../assets/logos/framer.png";
// import robot from "../../assets/logos/robot.png";

// import chaticon from "../../assets/logos/chat-icon.png";

// export default function LandingPage() {
//   const navigate = useNavigate();
//   const [chatVisible, setChatVisible] = useState(true); // state to show/hide initial-msg

//   return (
//     <div className="landing-root">
//       <nav className="landing-navbar">
//         <img src={hublyLogo} alt="Hubly Logo" className="nav-logo" />
//         <div className="landing-buttons">
//           <button className="nav-btn login" onClick={() => navigate("/login")}>
//             Login
//           </button>
//           <button className="nav-btn signup" onClick={() => navigate("/signup")}>
//             Sign Up
//           </button>
//         </div>
//       </nav>

//       <div className="landing-main">
//         <div className="left-part">
//           <h1>
//             Grow Your Business Faster <br /> with Hubly CRM
//           </h1>
//           <p>
//             Manage leads, automate workflows, and close deals effortlessly — all
//             in one powerful platform.
//           </p>
//           <div className="main-btn-group">
//             <button className="primary-btn">Get Started ➜</button>
//             <button className="secondary-btn watch-btn">
//               <Icon icon={playCircleIcon} className="play-icon" />
//               Watch Video
//             </button>
//           </div>
//         </div>
//         <div className="right-part">
//           <img src={rectangle} className="img-main" alt="Main" />
//           <img src={msgcard} className="img-small msgcard" alt="msg" />
//           <img src={analytics} className="img-small analytics" alt="analytics" />
//           <img src={calendar} className="img-small calendar" alt="calendar" />
//         </div>
//       </div>

//       {chatVisible && (
//         <div className="initial-msg">
//           <Icon
//             icon={closeIcon}
//             className="cross"
//             width="24"
//             onClick={() => setChatVisible(false)}
//           />
//           <img src={robot} className="robot" alt="robot" />
//           <p>👋 Want to chat about Hubly? I'm a chatbot here to help you find your way.</p>
//         </div>
//       )}

//       <div className="logos">
//         <img src={company} alt="" />
//         <img src={elastic} alt="" />
//         <img src={operdoor} alt="" />
//         <img src={airtable} alt="" />
//         <img src={elastic} alt="" />
//         <img src={framer} alt="" />
//       </div>

//       <div className="chat-icon">
//       <img src={chaticon} alt="chat-icon" />
//     </div>

//       <ChatWidget />
//     </div>
//   );
// }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatWidget from "../../components/ChatWidget/MiniChatBox";
import "./landing.css";
import { Icon } from "@iconify/react";
import playCircleIcon from "@iconify/icons-mdi/play-circle-outline";
import closeIcon from "@iconify/icons-mdi/close";

import hublyLogo from "../../assets/logos/hubly.png";
import rectangle from "../../assets/logos/rectangle.png";
import msgcard from "../../assets/logos/msgcard.png";
import analytics from "../../assets/logos/analytics.png";
import calendar from "../../assets/logos/calendar.png";
import company from "../../assets/logos/Company.png";
import elastic from "../../assets/logos/elastic.png";
import operdoor from "../../assets/logos/opendoor.png";
import airtable from "../../assets/logos/airtable.png";
import framer from "../../assets/logos/framer.png";
import robot from "../../assets/logos/robot.png";

import chaticon from "../../assets/logos/chat-icon.png";
import Cross from "../../assets/logos/Cross.png";

export default function LandingPage() {
  const navigate = useNavigate();
  const [chatVisible, setChatVisible] = useState(true);
  const [chatOpen, setChatOpen] = useState(false); // toggle state for chat

  return (
    <div className="landing-root">
      <nav className="landing-navbar">
        <img src={hublyLogo} alt="Hubly Logo" className="nav-logo" />
        <div className="landing-buttons">
          <button className="nav-btn login" onClick={() => navigate("/login")}>
            Login
          </button>
          <button
            className="nav-btn signup"
            onClick={() => navigate("/signup")}
          >
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
          <img
            src={analytics}
            className="img-small analytics"
            alt="analytics"
          />
          <img src={calendar} className="img-small calendar" alt="calendar" />
        </div>
      </div>

      {chatVisible && (
        <div className="initial-msg">
          <Icon
            icon={closeIcon}
            className="cross"
            width="24"
            onClick={() => setChatVisible(false)}
          />
          <img src={robot} className="robot" alt="robot" />
          <p>
            👋 Want to chat about Hubly? I'm a chatbot here to help you find
            your way.
          </p>
        </div>
      )}

      {/* Company Logos */}
      <div className="logos">
        <img src={company} alt="" />
        <img src={elastic} alt="" />
        <img src={operdoor} alt="" />
        <img src={airtable} alt="" />
        <img src={elastic} alt="" />
        <img src={framer} alt="" />
      </div>

      {/* Chat Icon or Close Icon */}
      <div className="chat-container">
        {chatOpen ? (
          <img 
            src={Cross}
          className="chat-toggle-icon" onClick={() => setChatOpen(false)}>
          </img>
        ) : (
          <img
            src={chaticon}
            alt="chat-icon"
            className="chat-toggle-icon"
            onClick={() => setChatOpen(true)}
          />
        )}

        {/* Chat Widget above icon */}
        {chatOpen && (
          <div className="chat-widget-container">
            <ChatWidget />
          </div>
        )}
      </div>
    </div>
  );
}
