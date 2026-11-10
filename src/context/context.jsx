import { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isGuest, setIsGuest] = useState(false);

  return (
    <AuthContext.Provider value={{ isGuest, setIsGuest }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useUserContext() {
  return useContext(AuthContext);
}
