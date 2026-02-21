import { useEffect, useState } from "react";
import { activateMembership, getMembershipPlans } from "../lib/member.services";
import type { IMembershipPlan } from "../interfaces/member.interface";
import generatePayload from "promptpay-qr";
import QRCode from "qrcode";
import { PROMPTPAY_NUMBER } from "../constants/payment";
import { useUser } from "../hooks/user";
import { createMembershipRequest } from "../lib/payment.service";

export default function Membership() {
  const { user } = useUser();

  const [plans, setPlans] = useState<IMembershipPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<IMembershipPlan | null>(
    null,
  );
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [slipFile, setSlipFile] = useState<File | null>(null);

  async function handlePayment() {
    if (!selectedPlan) return;

    const payload = generatePayload(PROMPTPAY_NUMBER, {
      amount: selectedPlan.price,
    });

    const qr = await QRCode.toDataURL(payload);
    setQrImage(qr);
  }

  useEffect(() => {
    async function load() {
      const data = await getMembershipPlans();
      setPlans(data);
    }
    load();
  }, []);

  async function handleConfirmPayment() {
    if (!slipFile || !selectedPlan || !user) return;

    try {
      await createMembershipRequest(user.uid, selectedPlan, slipFile);

      alert("ส่งสลิปเรียบร้อย รอ admin ตรวจสอบ ✅");

      setSlipFile(null);
      setQrImage(null);
      setSelectedPlan(null);
    } catch (error) {
      console.error(error);
      alert("เกิดข้อผิดพลาด");
    }
  }

  return (
    <main className="w-full h-full text-white p-4">
      {plans.map((plan) => (
        <div
          key={plan.id}
          onClick={() => setSelectedPlan(plan)}
          className="p-3 border mb-2 cursor-pointer"
        >
          {plan.name.th} - {plan.price} บาท
        </div>
      ))}

      {selectedPlan && (
        <div className="mt-4">
          <div>เลือก: {selectedPlan.name.th}</div>

          <button
            onClick={handlePayment}
            className="mt-2 bg-green-500 px-4 py-2 rounded"
          >
            ชำระเงิน
          </button>
        </div>
      )}

      {qrImage && (
        <>
          <div className="mt-6">
            <img src={qrImage} alt="QR Code" />
            <div>สแกนเพื่อจ่ายเงิน</div>
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              if (file.size > 1000000) {
                alert("ไฟล์ต้องไม่เกิน 1MB");
                return;
              }

              setSlipFile(file);
            }}
          />

          {slipFile && (
            <img src={URL.createObjectURL(slipFile)} className="mt-2 w-40" />
          )}

          <button
            onClick={handleConfirmPayment}
            className="bg-blue-500 px-4 py-2 mt-2"
          >
            ยืนยันการชำระเงิน
          </button>

          <button
            onClick={async () => {
              if (!user || !selectedPlan) return;

              try {
                await activateMembership(user.uid, selectedPlan);
                console.log("success");
                alert("สมัครสำเร็จ 🎉");
              } catch (error) {
                console.error("error:", error);
              }
            }}
          >
            ฉันจ่ายแล้ว
          </button>
        </>
      )}
    </main>
  );
}
