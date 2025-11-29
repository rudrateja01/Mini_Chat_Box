import React, { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

const initialState = {
  user: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [loading, setLoading] = React.useState(true); // NEW

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch({ type: "LOGIN", payload: JSON.parse(storedUser) });
    }
    setLoading(false); // DONE loading
  }, []);

  if (loading) return null; // or a spinner

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};