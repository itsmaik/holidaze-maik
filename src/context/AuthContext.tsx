import React, { createContext, useState } from 'react';

type TAuthContext = {
  user: string | null;
  token: string | null;
  login: (user: string, token: string) => void;
  logout: () => void;
}
type TAuthProvider = {
  children: React.ReactNode
}

export const AuthContext = createContext<TAuthContext | undefined>(undefined);

export default function AuthProvider ({ children }: TAuthProvider) {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (newUser: string, newToken: string) => {
    setUser(newUser);
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};