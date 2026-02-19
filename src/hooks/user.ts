import { useContext } from "react";
import { AuthContext } from "../contexts/auth-context";

export function useUser() {
  return useContext(AuthContext);
}
