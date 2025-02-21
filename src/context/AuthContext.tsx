import React, { createContext, useState, useEffect } from "react";

type TAuthContext = {
  user: string | null;
  token: string | null;
  userName: string | null;
  login: (user: string, token: string, userName: string) => void;
  logout: () => void;
  isLoggedIn: boolean;
};
type TAuthProvider = {
  children: React.ReactNode;
};

export const AuthContext = createContext<TAuthContext | undefined>(undefined);

export default function AuthProvider({ children }: TAuthProvider) {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const storedName = localStorage.getItem("userName");

    if (storedUser && storedToken && storedName) {
      setUser(storedUser);
      setToken(storedToken);
      setUserName(storedName)
      setIsLoggedIn(true);
    }
  }, []);

  const login = (newUser: string, newToken: string, newName: string,) => {
    setUser(newUser);
    setToken(newToken);
    setUserName(newName)
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", newUser);
    localStorage.setItem("name", newName);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    setIsLoggedIn(false)
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, token, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
