import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useLogin = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (EmailID, password) => {
    const res = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ EmailID, password }),
    });
    const data = await res.json();

    if (!res.ok) {
    throw new Error(data.message || "Login failed"); // 🔥 throw here
  }

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });
    }
  };

  return { login, error };
};

export default useLogin;
