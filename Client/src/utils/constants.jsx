// ===============================
// Global App Constants
// ===============================

export const API_BASE_URL = "http://localhost:5000/api";  
// Change when deploying

// Ticket Status Values
export const TICKET_STATUS = {
  OPEN: "open",
  IN_PROGRESS: "in-progress",
  RESOLVED: "resolved",
};

// User Roles
export const USER_ROLES = {
  ADMIN: "admin",
  TEAM: "team",
};

// Regex Patterns
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[0-9]{10}$/, // 10-digit phone
};

// Chat Defaults (used for settings fallback)
export const DEFAULT_CHAT_SETTINGS = {
  headerColor: "#001f8b",
  backgroundColor: "#ffffff",
  initialMessage: "Hi! How can we help you?",
  popMessage: "Need help? Chat with us!",
  introFields: {
    name: true,
    email: true,
    phone: true,
  },
};
