import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "./firebase";
import type { IMembershipPlan } from "../interfaces/member.interface";

export async function convertToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
}

export async function createMembershipRequest(
  userId: string,
  plan: IMembershipPlan,
  slipFile: File,
) {
  const base64 = await convertToBase64(slipFile);

  await addDoc(collection(db, "membership-requests"), {
    userId,
    planId: plan.id,
    planName: plan.name.th,
    price: plan.price,
    slipBase64: base64,
    status: "pending",
    createdAt: Timestamp.now(),
  });
}
