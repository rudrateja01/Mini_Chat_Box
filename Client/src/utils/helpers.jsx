// ===============================
// Helper Utility Functions
// ===============================

// Format date to something readable
export const formatDate = (date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// Create random ticket ID (e.g., HUB-78322)
export const generateTicketId = () => {
  return "HUB-" + Math.floor(10000 + Math.random() * 90000);
};

// Async wrapper (avoid try/catch everywhere)
export const asyncHandler = async (fn) => {
  try {
    const data = await fn();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

// Safely access object keys
export const safeGet = (obj, path, fallback = null) => {
  try {
    return path.split(".").reduce((acc, key) => acc[key], obj) ?? fallback;
  } catch {
    return fallback;
  }
};

// Convert text to sentence case
export const toSentence = (text = "") => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

// Delay function (useful for loaders)
export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
