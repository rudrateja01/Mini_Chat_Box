import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

const Admin = async () => {
  try {
    const existingAdmin = await User.findOne({ role: "admin" });
    if (!existingAdmin) {
      const email = process.env.ADMIN_EMAIL;
      const password = process.env.ADMIN_PASSWORD;
      if (!email || !password) return;
      const hashed = await bcrypt.hash(password, 10);
      await User.create({
        name: "Rudra",
        email,
        password: hashed,
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

    // Send response
    res.status(201).json({
      message: "Signup successful",
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

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "User Logined Successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
};
