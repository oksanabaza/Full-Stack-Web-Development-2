import React, { createContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import fakeAuth from "../components/Auth";
import { AuthContextInterface } from "../types/interfaces";

export const AuthContext = createContext<AuthContextInterface | null>(null);

const AuthContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }
  }, []);

  const authenticate = async (username: string, password: string) => {
    try {
      const token = await fakeAuth(username, password);
      localStorage.setItem('token', JSON.stringify(token));
      setToken(token);
      const origin = location.state?.intent?.pathname || '/';
      navigate(origin);
    } catch (error) {
      console.error(error);
    }
  };

  const signout = () => {
    setToken(null);
    localStorage.removeItem('token');
    // navigate('/login', { replace: true });
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        authenticate,
        signout
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
