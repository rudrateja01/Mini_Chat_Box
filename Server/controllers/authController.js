import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

const Admin = async () => {
  try {
    const existingAdmin = await User.findOne({ role: "admin" });
    if (!existingAdmin) {
      const firstname = process.env.ADMIN_FIRSTNAME;
      const lastname = process.env.ADMIN_LASTNAME;
      const email = process.env.ADMIN_EMAIL;
      const password = process.env.ADMIN_PASSWORD;
      if (!email || !password) return;
      const confirmpassword = password;
      const hashed = await bcrypt.hash(password, 10);
      await User.create({
        firstname,
        lastname,
        email,
        password: hashed,
        confirmpassword,
        role: "admin",
      });
      console.log("Admin created:", email);
    }
  } catch (err) {
    console.error("Failed to create Admin:", err.message);
  }
};
// Call this function when the app starts
Admin();

// Signup
export const signup = async (req, res) => {
  try {
    console.log("REQ BODY =>", req.body);
    const { firstname, lastname, email, password, confirmpassword, role } =
      req.body;

    if (!firstname || !lastname || !email || !password || !confirmpassword) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check existing email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Only check for admin role duplication
    if (role === "admin") {
      const existingAdmin = await User.findOne({ role: "admin" });
      if (existingAdmin) {
        return res.status(400).json({ message: "Admin already Exists" });
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role,
    });
    // Generate token when signup success
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Send response
    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email Doesn't Exists" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      message: "User Logined Successfully",
      token,
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // remove password field
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: err.message });
  }
};

// Delete user

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Make sure user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent deleting admin accidentally
    if (user.role === "admin") {
      return res.status(403).json({ message: "Cannot delete admin" });
    }

    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Fetch logged-in admin
export const getAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update logged-in admin
export const updateAdmin = async (req, res) => {
  try {
    const { firstname, lastname, password, confirmPassword } = req.body;

    // Fetch logged-in admin by ID
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update firstname & lastname if provided
    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;

    // Update password if provided
    if (password) {
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    res.json({
      message: "Details updated successfully",
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email, // email remains unchanged
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
