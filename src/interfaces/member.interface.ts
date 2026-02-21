import type { Timestamp } from "firebase/firestore";

export interface IMembershipPlan {
  id: string;
  name: {
    th: string;
    en: string;
  };
  price: number;
  months?: number;
  days?: number;
  credits?: number;
}

export interface IMembershipRequest {
  id: string;
  userId: string;
  planId: string;
  planName: string;
  price: number;

  slipBase64: string;

  status: "pending" | "approved" | "rejected";

  createdAt: Timestamp;
  approvedAt?: Timestamp;
  approvedBy?: string;
}
