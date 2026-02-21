import {
  doc,
  updateDoc,
  Timestamp,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase";
import dayjs from "dayjs";
import type { IMembershipPlan } from "../interfaces/member.interface";

export async function getMembershipPlans(): Promise<IMembershipPlan[]> {
  const snapshot = await getDocs(collection(db, "membership-plans"));

  return snapshot.docs.map((doc) => {
    const data = doc.data() as Omit<IMembershipPlan, "id">;

    return {
      id: doc.id,
      ...data,
    };
  });
}

export async function activateMembership(
  userId: string,
  plan: IMembershipPlan,
) {
  let expire = dayjs();

  if (plan.months) expire = expire.add(plan.months, "month");
  if (plan.days) expire = expire.add(plan.days, "day");

  await updateDoc(doc(db, "users", userId), {
    membership: {
      planId: plan.id,
      credits: plan.credits || null,
      expireAt: Timestamp.fromDate(expire.toDate()),
    },
  });
}
