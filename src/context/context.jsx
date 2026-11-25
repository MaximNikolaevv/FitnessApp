import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../backend/api";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsLoggedIn(Boolean(session?.user));
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const isGuest = !isLoggedIn;





  return (
    <AuthContext.Provider value={{ isLoggedIn, isGuest, isLoading, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useUserContext() {
  return useContext(AuthContext);
}
