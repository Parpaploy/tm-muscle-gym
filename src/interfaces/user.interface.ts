import type { Timestamp } from "firebase/firestore";

export interface IUser {
  uid: string;
  email?: string;
  role?: "admin" | "user";
  createdAt?: Timestamp;
  name: string;
  lastName: string;
  birthdate: number | null;
  address: string;
  workAddress: string;
  phone: string;

  membershipPlan?:
    | "daily"
    | "1month"
    | "3month"
    | "6month"
    | "1year"
    | "package";
  expireAt?: Timestamp;

  credits?: number;
}

export interface SignupData {
  name: string;
  lastName: string;
  birthdate: number | null;
  address: string;
  workAddress: string;
  phone: string;
}
