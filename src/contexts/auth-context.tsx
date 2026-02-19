import { createContext } from "react";
import type { IUser } from "../interfaces/user.interface";

export interface AuthContextType {
  user: IUser | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});
