// ===============================
// Validators for Forms
// ===============================

// Email Validation
export const isValidEmail = (email) => {
  if (!email) return false;
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};

// Phone Validation (10-digit)
export const isValidPhone = (phone) => {
  if (!phone) return false;
  const pattern = /^[0-9]{10}$/;
  return pattern.test(phone);
};

// Name Validation
export const isValidName = (name) => {
  if (!name) return false;
  return name.trim().length >= 2;
};

// Password Validation (min 6 characters)
export const isValidPassword = (password) => {
  if (!password) return false;
  return password.length >= 6;
};

// General Form Validator
export const validateForm = (data = {}) => {
  let errors = {};

  if (data.name !== undefined && !isValidName(data.name)) {
    errors.name = "Invalid name";
  }
  if (data.email !== undefined && !isValidEmail(data.email)) {
    errors.email = "Invalid email";
  }
  if (data.phone !== undefined && !isValidPhone(data.phone)) {
    errors.phone = "Phone must be 10 digits";
  }
  if (data.password !== undefined && !isValidPassword(data.password)) {
    errors.password = "Password must be at least 6 characters";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
