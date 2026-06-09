import { createContext, useContext, useEffect, useState } from "react";
import {
  signup,
  login,
  fetchCurrentUser,
  logoutUser,
} from "../services/auth.js";
import { toast } from "react-toastify";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [loggeduser, setLoggeduser] = useState(null);
  const [loginErr, setLoginErr] = useState(null);
  const [signupErr, setSignupErr] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleError = (status, message) => {
    switch (status) {
      case 401:
        return message || "Invalid Credentials";
      case 500:
        return message || "Server Error!";
      default:
        return "Something went wrong, Try again";
    }
  };
  const checkAuth = async () => {
    try {
      const user = await fetchCurrentUser();
      setLoggeduser(user);
    } catch (error) {
      setLoggeduser(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);

  const signupUser = async (formData) => {
    setSignupErr(null);
    try {
      const response = await signup(formData);
      return true;
    } catch (error) {
      const errorMessage = handleError(error.status, error.message);
      setSignupErr(errorMessage);
      return false;
    }
  };
  const loginUser = async (credentials) => {
    setLoginErr(null);
    try {
      const data = await login(credentials);
      toast.success("Login Successfull");
      setLoggeduser(data.user);
      return true;
    } catch (error) {
      const errorMessage = handleError(error?.status, error?.message);
      setLoginErr(errorMessage);
      return false;
    }
  };

  const logout = async () => {
    try {
      setSignupErr(null);
      setLoginErr(null);
      await logoutUser();
      setLoggeduser(null);
      return true;
    } catch (error) {
      toast.error(error.message || "Unable to logout, Try again");
      return false;
    }
  };
  const clearAuthErr = () => {
    setLoginErr(null);
    setSignupErr(null);
  };
  return (
    <AuthContext.Provider
      value={{
        loggeduser,
        setLoggeduser,
        loading,
        logout,
        signupUser,
        loginUser,
        loginErr,
        signupErr,
        clearAuthErr,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
