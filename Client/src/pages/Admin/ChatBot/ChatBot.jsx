import React, { useState } from "react";
import "./ChatBot.css";

export default function ChatBotSettings() {
  const defaultSettings = {
    headerColor: "#4a90e2",
    backgroundColor: "#ffffff",
    initialMessage: "Hello! How can I help you?",
    introFormFields: [
      { label: "Name", placeholder: "Enter your name", visible: true },
      { label: "Email", placeholder: "Enter your email", visible: true },
      { label: "Phone", placeholder: "Enter your phone", visible: true },
    ],
    popMessageText: "Need help? Click here!",
    missedChatTimer: 5,
  };

  const [settings, setSettings] = useState(defaultSettings);

  const isValidColor = (color) => {
    const s = new Option().style;
    s.color = color;
    return s.color !== "";
  };

  const handleChange = (key, value) => {
    if ((key === "headerColor" || key === "backgroundColor") && !isValidColor(value)) return;
    setSettings({ ...settings, [key]: value });
  };

  const handleIntroFieldChange = (index, key, value) => {
    const updatedFields = [...settings.introFormFields];
    updatedFields[index][key] = key === "visible" ? value : value;
    setSettings({ ...settings, introFormFields: updatedFields });
  };

  const handleSave = () => {
    console.log("Settings saved:", settings);
    alert("Settings saved! (connect to backend to persist)");
  };

  return (
    <div className="chatbot-settings-container">
      <h1>ChatBot Settings</h1>

      <div className="setting-row">
        <label>Header Color:</label>
        <input
          type="color"
          value={settings.headerColor}
          onChange={(e) => handleChange("headerColor", e.target.value)}
        />
      </div>

      <div className="setting-row">
        <label>Background Color:</label>
        <input
          type="color"
          value={settings.backgroundColor}
          onChange={(e) => handleChange("backgroundColor", e.target.value)}
        />
      </div>

      <div className="setting-row">
        <label>Initial Message:</label>
        <input
          type="text"
          value={settings.initialMessage}
          onChange={(e) => handleChange("initialMessage", e.target.value)}
        />
      </div>

      <div className="intro-form-fields">
        <h3>Intro Form Fields</h3>
        {settings.introFormFields.map((field, idx) => (
          <div className="intro-field-row" key={idx}>
            <input
              type="text"
              value={field.label}
              onChange={(e) => handleIntroFieldChange(idx, "label", e.target.value)}
              placeholder="Label"
            />
            <input
              type="text"
              value={field.placeholder}
              onChange={(e) => handleIntroFieldChange(idx, "placeholder", e.target.value)}
              placeholder="Placeholder"
            />
            <label>
              Visible
              <input
                type="checkbox"
                checked={field.visible}
                onChange={(e) => handleIntroFieldChange(idx, "visible", e.target.checked)}
              />
            </label>
          </div>
        ))}
      </div>

      <div className="setting-row">
        <label>Pop Message Text:</label>
        <input
          type="text"
          value={settings.popMessageText}
          onChange={(e) => handleChange("popMessageText", e.target.value)}
        />
      </div>

      <div className="setting-row">
        <label>Missed Chat Timer (minutes):</label>
        <input
          type="number"
          value={settings.missedChatTimer}
          onChange={(e) => handleChange("missedChatTimer", parseInt(e.target.value))}
          min={1}
        />
      </div>

      <button className="save-btn" onClick={handleSave}>
        Save Settings
      </button>

      {/* Live Preview */}
      <div
        className="chat-preview"
        style={{ backgroundColor: settings.backgroundColor }}
      >
        <div
          className="chat-header-preview"
          style={{ backgroundColor: settings.headerColor }}
        >
          Chat Header
        </div>
        <p>{settings.initialMessage}</p>
        <p className="pop-message-preview">{settings.popMessageText}</p>
      </div>
    </div>
  );
}
