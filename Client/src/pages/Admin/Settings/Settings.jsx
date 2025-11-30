import React, { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import infoIcon from "@iconify/icons-mdi/information";
import useLogout from "../../../hooks/useLogout";
import "./Settings.css";

export default function Settings() {
  const { logout } = useLogout();

  const [settings, setSettings] = useState({
    headerColor: "#001f8b",
    backgroundColor: "#fff",
    initialMessage: "", // Will be fetched from backend
    missedChatTimer: 5,
    firstName: "",
    lastName: "",
    email: "", // email fetched but not editable
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const update = (key, value) => setSettings({ ...settings, [key]: value });

  // Fetch logged-in admin details
  useEffect(() => {
    const fetchAdmin = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:4000/api/auth/admin", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setSettings((prev) => ({
          ...prev,
          firstName: res.data.firstname || "",
          lastName: res.data.lastname || "",
          email: res.data.email || "",
          initialMessage: res.data.initialMessage || "", // fetched from backend
          password: "",
          confirmPassword: "",
        }));
      } catch (err) {
        console.error("Failed to fetch admin:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmin();
  }, [token]);

  const handleUpdate = async () => {
    try {
      // Prepare payload
      const payload = {
        firstname: settings.firstName,
        lastname: settings.lastName,
        initialMessage: settings.initialMessage,
      };

      if (settings.password) {
        payload.password = settings.password;
        payload.confirmPassword = settings.confirmPassword;
      }

      await axios.put("http://localhost:4000/api/auth/admin", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Details updated successfully. You will be logged out.");
      logout();
    } catch (err) {
      console.error("Failed to update admin:", err);
      if (err.response?.data?.message) alert(err.response.data.message);
      else alert("Failed to update details.");
    }
  };

  if (loading) return <p>Loading...</p>;

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
            <input type="email" value={settings.email} disabled />
            <Icon icon={infoIcon} className="info-icon" />
          </div>

          <label>Password</label>
          <div className="input-with-icon">
            <input
              type="password"
              value={settings.password}
              onChange={(e) => update("password", e.target.value)}
              placeholder="Enter new password"
            />
            <Icon icon={infoIcon} className="info-icon" />
          </div>

          <label>Confirm Password</label>
          <div className="input-with-icon">
            <input
              type="password"
              value={settings.confirmPassword}
              onChange={(e) => update("confirmPassword", e.target.value)}
              placeholder="Confirm new password"
            />
            <Icon icon={infoIcon} className="info-icon" />
          </div>
        </div>
      </div>

      <button className="settings-save-btn" onClick={handleUpdate}>
        Save
      </button>
    </div>
  );
}
