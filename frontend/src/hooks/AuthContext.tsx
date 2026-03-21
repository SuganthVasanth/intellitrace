import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { googleLogout, CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

interface User {
  name: string;
  email: string;
  picture: string;
}

interface AuthContextType {
  user: User | null;
  login: (credentialResponse: CredentialResponse) => void;
  loginDemo: () => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    console.log("AuthProvider INITIALIZE - savedUser found:", !!savedUser);
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
      } catch (error) {
        console.error("Failed to parse saved user", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const decoded: any = jwtDecode(credentialResponse.credential);
      const userData: User = {
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("AuthProvider - User logged in:", userData.email);
    }
  };

  const loginDemo = () => {
    const userData: User = {
      name: "Demo User",
      email: "demo@example.com",
      picture: "https://github.com/shadcn.png",
    };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    console.log("AuthProvider - Demo User logged in");
  };

  const logout = () => {
    googleLogout();
    setUser(null);
    localStorage.removeItem("user");
    console.log("AuthProvider - User logged out");
  };

  return (
    <AuthContext.Provider value={{ user, login, loginDemo, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
