import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    case "LOAD_USER":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Set axios default authorization header
  useEffect(() => {
    if (state.token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [state.token]);

  // Load user on app start
  useEffect(() => {
    if (state.token && !state.user) {
      loadUser();
    } else {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  const loadUser = async () => {
    try {
      const response = await axios.get("/api/auth/me");
      dispatch({ type: "LOAD_USER", payload: response.data });
    } catch (error) {
      console.error("Error loading user:", error);
      dispatch({ type: "LOGOUT" });
    }
  };

  const login = async (email, password) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const response = await axios.post("/api/auth/login", {
        email: email.trim(),
        password,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      let errorMessage = "Login failed";

      if (error.response?.status === 401) {
        errorMessage =
          "Invalid email or password. Please check your credentials.";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (!error.response) {
        errorMessage =
          "Cannot connect to server. Please check if the server is running.";
      }

      dispatch({ type: "SET_ERROR", payload: errorMessage });
      throw new Error(errorMessage);
    }
  };

  const register = async (userData) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const response = await axios.post("/api/auth/register", userData);
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
      return response.data;
    } catch (error) {
      let errorMessage = "Registration failed";

      if (
        error.response?.status === 400 &&
        error.response?.data?.message?.includes("already exists")
      ) {
        errorMessage =
          "An account with this email already exists. Please use a different email or try logging in.";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      dispatch({ type: "SET_ERROR", payload: errorMessage });
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
