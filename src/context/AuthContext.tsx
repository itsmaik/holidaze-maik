import React, { createContext, useState, useEffect } from "react";

type TAuthContext = {
  user: string | null;
  token: string | null;
  login: (user: string, token: string) => void;
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (newUser: string, newToken: string) => {
    setUser(newUser);
    setToken(newToken);
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", newUser);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    setIsLoggedIn(false)
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
