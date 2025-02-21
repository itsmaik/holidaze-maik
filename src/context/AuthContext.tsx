import React, { createContext, useState, useEffect, useCallback } from "react";

interface TAuthContext {
  user: string | null;
  token: string | null;
  userName: string | null;
  login: (user: string, token: string, userName: string) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

interface TAuthProvider {
  children: React.ReactNode;
}

export const AuthContext = createContext<TAuthContext | undefined>(undefined);

export default function AuthProvider({ children }: TAuthProvider) {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const storedUserName = localStorage.getItem("userName");

    if (storedUser && storedToken && storedUserName) {
      setUser(storedUser);
      setToken(storedToken);
      setUserName(storedUserName);
      setIsLoggedIn(true);
    }
  }, []);

  const login = useCallback(
    (newUser: string, newToken: string, newUserName: string) => {
      setUser(newUser);
      setToken(newToken);
      setUserName(newUserName);
      localStorage.setItem("user", newUser);
      localStorage.setItem("token", newToken);
      localStorage.setItem("userName", newUserName);
      setIsLoggedIn(true);
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setUserName(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, token, userName, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
