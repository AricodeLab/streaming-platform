/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useState, useEffect } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { api, recoverUserInfo } from "../service/api";
import { NextRouter, useRouter } from "next/router";

type User = {
  email: string;
  password: string;
};

interface AuthContextData {
  isAuthenticated: boolean;
  isAdmin: boolean
  signUp: (data: User, forAdm?: boolean) => void;
  logout: () => void;
  user: User;
  router: NextRouter
  message: string;
  error: string;
  setMessage:(Message: string) => void;
  setError: (errorMessage: string) => void;
  setIsAuthenticated: (Authenticated: boolean) => void;
  setIsAdmin: (isAdmin: boolean) => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const router = useRouter();
  const signUp = async (data: User,forAdm?: boolean) => {
    try {
      const response = await api.post<{ msg: string; token: string }>(
        "https://backend-vx8e.onrender.com/users/login",
        data
      );
   
      if (response.status == 201) {
        const { msg, token } = response.data;
        setCookie(undefined, "Authentication", token);
        api.defaults.headers["Authorization"] = `Bearer ${token}`;
        setIsAuthenticated(true);
        if (forAdm){
          setIsAdmin(true)
        }
      }
    } catch (e) {


      console.log(e)
      setError(e.response.data.message);
    }
  };

  const logout = () => {
    destroyCookie(undefined, "Authentication") && setIsAuthenticated(false);
    setMessage("Haz hecho logout")
    router.push("/")
  };

  return (
    <AuthContext.Provider
      value={{
        router,
        isAuthenticated,
        isAdmin,
        signUp,
        logout,
        message,
        setMessage,
        user,
        error,
        setError,
        setIsAuthenticated,
        setIsAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
