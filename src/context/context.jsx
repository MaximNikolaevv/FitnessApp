import { createContext, useContext } from "react";

export const AuthContext = createContext(null);

export function useUserContext() {
  return useContext(AuthContext);
}
