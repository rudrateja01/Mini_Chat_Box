import { useState } from "react";
import axios from "axios";

const useSignup = () => {
  const [error, setError] = useState(null);

  const signup = async (firstname, lastname, email, password, confirmpassword) => {
  setError(null);

  try {
    const res = await axios.post("http://localhost:4000/api/auth/signup", {
      firstname,
      lastname,
      email,
      password,
      confirmpassword,   // ← backend expects this
    });

    return res.data;  // ✅ you return it, but you never save in localStorage
  } catch (err) {
    console.log("SIGNUP ERROR => ", err.response.data);
    setError(err.response?.data?.message || "Signup failed");
  }
};


  return { signup, error };
};

export default useSignup;
