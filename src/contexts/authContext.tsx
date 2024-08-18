// @ts-nocheck
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContextInterface } from "../types/interfaces";
import { supabase } from "../supabaseClient"; 

export const AuthContext = createContext<AuthContextInterface | null>(null);

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error getting session:', error.message);
        return;
      }

      const session = data.session;
      if (session) {
        setToken(session.access_token);
        localStorage.setItem('token', JSON.stringify(session.access_token));
      }
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setToken(session.access_token);
          localStorage.setItem('token', JSON.stringify(session.access_token));
        } else {
          setToken(null);
          localStorage.removeItem('token');
        }
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

 const authenticateWithGithub = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    });
    if (error) throw error;
    
  } catch (error) {
    console.error('Error signing in with GitHub:', (error as Error).message);
  }
};


  const signout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setToken(null);
      localStorage.removeItem('token');
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Error signing out:', (error as Error).message);
    }
  };

  const contextValue: AuthContextInterface = {
    token,
    authenticate: authenticateWithGithub,
    signout
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
