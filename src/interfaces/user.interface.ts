import type { Timestamp } from "firebase/firestore";

export interface IUser {
  uid: string;
  email?: string;
  role?: "admin" | "user";
  createdAt?: Timestamp;
}
