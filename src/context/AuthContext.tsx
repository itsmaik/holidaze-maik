import React, { createContext, useState, useEffect, useCallback } from "react";

interface TAuthContext {
  user: string | null;
  token: string | null;
  userName: string | null;
  login: (user: string, token: string, userName: string) => void;
  logout: () => void;
  isLoggedIn: boolean;
  loading: boolean;
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const storedUserName = localStorage.getItem("userName");

    if (
      storedUser &&
      storedToken &&
      storedToken !== "undefined" &&
      storedUserName
    ) {
      setUser(storedUser);
      setToken(storedToken);
      setUserName(storedUserName);
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
    }

    setLoading(false);
  }, []);

  const login = useCallback(
    (newUser: string, newToken: string, newUserName: string) => {
      if (!newUser || !newToken || !newUserName) {
        console.warn("Invalid login payload:", {
          newUser,
          newToken,
          newUserName,
        });
        return;
      }

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
      value={{ isLoggedIn, user, token, userName, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
