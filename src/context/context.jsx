import { createContext, useContext, useState, useEffect } from "react";

import { saveData, getData } from "../storage/storage";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isGuest, setIsGuest] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const guest = await getData("isGuest");

        if (guest === "true") {
          setIsGuest(true);
        }
      } catch (error) {
        console.log("Error loading user:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, []);

  async function continueAsGuest() {
    await saveData("isGuest", "true");
    setIsGuest(true);
  }

  return (
    <AuthContext.Provider
      value={{ isGuest, setIsGuest, continueAsGuest, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useUserContext() {
  return useContext(AuthContext);
}
