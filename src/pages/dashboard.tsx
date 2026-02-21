import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/user";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { activateMembership } from "../lib/member.services";
import { useEffect, useState } from "react";
import type { IMembershipRequest } from "../interfaces/member.interface";

export default function Dashboard() {
  const { user } = useUser();
  const [requests, setRequests] = useState<IMembershipRequest[]>([]);
  const [loading, setLoading] = useState(true);

  async function getPendingRequests(): Promise<IMembershipRequest[]> {
    const q = query(
      collection(db, "membership-requests"),
      where("status", "==", "pending"),
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data() as Omit<IMembershipRequest, "id">;

      return {
        id: docSnap.id,
        ...data,
      };
    });
  }

  async function approveRequest(request: IMembershipRequest) {
    if (!user) return;

    await activateMembership(request.userId, {
      id: request.planId,
      name: { th: request.planName, en: request.planName },
      price: request.price,
    });

    await updateDoc(doc(db, "membership-requests", request.id), {
      status: "approved",
      approvedAt: Timestamp.now(),
      approvedBy: user.uid,
    });

    const updated = await getPendingRequests();
    setRequests(updated);
  }

  useEffect(() => {
    if (user?.role !== "admin") return;

    async function load() {
      const data = await getPendingRequests();
      setRequests(data);
      setLoading(false);
    }

    load();
  }, [user]);

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return <div className="text-white p-4">Loading...</div>;
  }

  return (
    <div className="p-4 text-white">
      <h1 className="text-xl mb-4">Pending Requests</h1>

      {requests.length === 0 && <div>ไม่มีรายการรออนุมัติ</div>}

      {requests.map((req) => {
        console.log(req);
        return (
          <div key={req.id} className="border p-3 mb-3">
            <div>ผู้ใช้: {req.userId}</div>
            <div>แพ็กเกจ: {req.planName}</div>
            <div>ราคา: {req.price}</div>

            {req.slipBase64 && (
              <img
                src={req.slipBase64}
                alt="slip"
                className="w-40 mt-2 border"
              />
            )}

            <button
              onClick={() => approveRequest(req)}
              className="bg-green-500 px-3 py-1 mt-2"
            >
              Approve
            </button>
          </div>
        );
      })}
    </div>
  );
}
