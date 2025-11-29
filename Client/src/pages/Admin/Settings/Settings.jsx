import React, { useState } from "react";
import "./Settings.css";
import { Icon } from "@iconify/react";
import infoIcon from "@iconify/icons-mdi/information";

export default function Settings() {
  const [settings, setSettings] = useState({
    headerColor: "#001f8b",
    backgroundColor: "#fff",
    initialMessage: "Hello! How can we help you?",
    missedChatTimer: 5,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const update = (key, value) => setSettings({ ...settings, [key]: value });

  const save = () => {
    // Here you could send settings to backend
    alert("Settings saved (mock)");
  };

  return (
    <div className="settings-container">
      <h3>Settings</h3>

      <div className="settings-section">
        <h4>Edit Profile</h4>
        <hr />
        <div className="settings-form">
          <label>First Name</label>
          <input
            type="text"
            value={settings.firstName}
            onChange={(e) => update("firstName", e.target.value)}
          />

          <label>Last Name</label>
          <input
            type="text"
            value={settings.lastName}
            onChange={(e) => update("lastName", e.target.value)}
          />

          <label>Email</label>
          <div className="input-with-icon">
            <input
              type="email"
              value={settings.email}
              onChange={(e) => update("email", e.target.value)}
            />
            <Icon icon={infoIcon} className="info-icon" />
          </div>

          <label>Password</label>
          <div className="input-with-icon">
            <input
              type="password"
              value={settings.password}
              onChange={(e) => update("password", e.target.value)}
            />
            <Icon icon={infoIcon} className="info-icon" />
          </div>

          <label>Confirm Password</label>
          <div className="input-with-icon">
            <input
              type="password"
              value={settings.confirmPassword}
              onChange={(e) => update("confirmPassword", e.target.value)}
            />
            <Icon icon={infoIcon} className="info-icon" />
          </div>
        </div>
      </div>

      <button className="settings-save-btn" onClick={save}>
        Save
      </button>
    </div>
  );
}
