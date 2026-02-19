import type { Timestamp } from "firebase/firestore";

export interface IUser {
  uid: string;
  email?: string;
  role?: "admin" | "user";
  createdAt?: Timestamp;
}

export interface SignupData {
  name: string;
  lastName: string;
  birthdate: number | null;
  address: string;
  workAddress: string;
  phone: string;
}
