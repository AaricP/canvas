import { createContext, useContext, useEffect, useState } from "react";
import { useApi } from "../../apiV3";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const usersApi = useApi("users");
  const [loading, setLoading] = useState(true);
  const userApi = useApi("user");

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = await userApi.getAll();
      if (currentUser && currentUser.length > 0) {
        setUser(currentUser[0]);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const register = async ({ email, password }) => {
    try {
      if (email === "" || password === "") {
        alert("Please fill in both email and password.");
        return;
      } else {
        await usersApi.create({ email, password, userType: 'student' });
        return true;
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const login = async ({ email, password }) => {
    try {
      const loginUser = await usersApi.getByField("email", email);
      if (loginUser && loginUser.password === password) {
        setUser(loginUser);
        await userApi.create({ ...loginUser });
        return loginUser;
      } else {
        console.error("User not found");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      return null;
    }
  };

  const logout = async () => {
    try {
      await userApi.deleteAll();
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout, userApi, usersApi }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used in the AuthProvider");
  }

  return context;
};
