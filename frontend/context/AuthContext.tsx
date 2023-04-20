/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useState, useEffect } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { api, recoverUserInfo } from "../service/api";

type User = {
  email: string;
  password: string;
};

interface AuthContextData {
  isAuthenticated: boolean;
  signUp: (data: User) => void;
  logout: () => void;
  user: User;
  error: string;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const signUp = async (data: User) => {
    try {
      const response = await api.post<{ msg: string; token: string }>(
        "/users/login",
        data
      );

      if (response.status == 201) {
        const { msg, token } = response.data;
        alert(msg);
        setCookie(undefined, "Authentication", token);
        api.defaults.headers["Authorization"] = `Bearer ${token}`;
        setIsAuthenticated(true);
      }
    } catch (e) {
      setError(e.data);
    }
  };

  const logout = () => {
    destroyCookie(undefined, "Authentication") && setIsAuthenticated(false);
  };

  useEffect(() => {
    const { "Authentication.token": token } = parseCookies();
    if (token) recoverUserInfo().then((res) => console.log(res.data[0]?.useEmail));
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, signUp, logout, user, error }}>
      {children}
    </AuthContext.Provider>
  );
}
