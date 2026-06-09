import { createContext, useContext, useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import { getUsers } from "../services/auth.js";

export const UserContext = createContext();

function UserProvider({ children }) {
  const [searchList, setSearchList] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiErr, setApiErr] = useState(null);
  const { loggeduser } = useAuth();
  //handle response errors
  const handleErrors = (status, message) => {
    switch (status) {
      case 400:
        return message || "Search is required";
      case 401:
        return message || "Unauthorised request";
      case 404:
        return message || "User not found";
      case 500:
        return message || "Internal Connection Error";
      default:
        return "Something went wrong, Try again";
    }
  };
  const fetchUsers = async () => {
    setLoading(true);
    setApiErr(null);
    try {
      const data = await getUsers();
      setUsers(data);
      setSearchList(data);
    } catch (error) {
      const errorMessage = handleErrors(error.status, error.message);
      setApiErr(errorMessage);
      setUsers([]);
      setSearchList([]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <UserContext.Provider
      value={{ fetchUsers, users, searchList, setSearchList, loading, apiErr }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used inside UserProvider");
  return context;
};

export default UserProvider;
