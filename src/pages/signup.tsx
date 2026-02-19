import { useState } from "react";
import { logout, signupWithEmail } from "../lib/auth.services";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/user";
import Input from "../components/input";
import Swal from "sweetalert2";
import TextArea from "../components/text-area";
import PhoneInput from "../components/phone-input";
import DateInput from "../components/date-input";
import { useTranslation } from "react-i18next";
import GlobalLoading from "../components/global-loading";

export default function Signup() {
  const { user, loading } = useUser();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [birthdate, setBirthdate] = useState<number | null>(null);
  const [address, setAddress] = useState<string>("");
  const [workAddress, setWorkAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const isFormValid =
    name.trim().length > 0 &&
    lastName.trim().length > 0 &&
    birthdate !== null &&
    address.trim().length > 0 &&
    workAddress.trim().length > 0 &&
    phone.trim().length > 0 &&
    isValidEmail(email.trim()) &&
    password.trim().length >= 6 &&
    password === confirmPassword;

  if (loading) {
    return (
      <main className="w-full h-full flex flex-col justify-center items-center">
        <GlobalLoading />
      </main>
    );
  }

  if (user) {
    return <Navigate to="/private" replace />;
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        background: "#2E2E2E",
        color: "#fff",
        icon: "error",
        title: "รหัสผ่านไม่ตรงกัน",
        text: "กรุณาตรวจสอบอีกครั้ง",
        confirmButtonColor: "#FFA60C",
      });
      return;
    }

    setBtnLoading(true);

    try {
      await signupWithEmail(email, password, {
        name,
        lastName,
        birthdate,
        address,
        workAddress,
        phone,
      });

      await logout();

      await Swal.fire({
        background: "#2E2E2E",
        color: "#fff",
        icon: "success",
        title: "สมัครสมาชิกสำเร็จ",
        text: "กรุณาเข้าสู่ระบบ",
        confirmButtonColor: "#FFA60C",
      });

      navigate("/login", { replace: true });
    } catch (err: unknown) {
      if (err instanceof Error) {
        Swal.fire({
          background: "#2E2E2E",
          color: "#fff",
          icon: "error",
          title: "สมัครไม่สำเร็จ",
          text: err.message,
          confirmButtonColor: "#FFA60C",
        });
      } else {
        Swal.fire({
          background: "#2E2E2E",
          color: "#fff",
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "Sign up failed",
          confirmButtonColor: "#FFA60C",
        });
      }
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <main className="w-full h-full flex flex-col justify-start items-center py-10 gap-y-5">
      <section className="w-full text-center text-[16px] text-white">
        <h1 className="text-[18px] font-bold">หัวข้อหยั่ย</h1>
        <p>TM GYM member</p>
      </section>

      <section className="overflow-y-auto px-3 py-5 w-[85%] h-auto bg-[#8C8C8C] border border-[#D9D9D9] text-center text-white rounded-[5px] space-y-3">
        <h1 className="text-[16px]">{t("header.signup")}</h1>

        <form className="space-y-1" onSubmit={handleSignup}>
          <Input
            label={t("input.name")}
            id="name"
            onChange={(e) => setName(e.target.value)}
            placeholder={t("input.name")}
            value={name}
            required={true}
          />
          <Input
            label={t("input.lastname")}
            id="lastname"
            onChange={(e) => setLastName(e.target.value)}
            placeholder={t("input.lastname")}
            value={lastName}
            required={true}
          />
          <DateInput
            label={t("input.birthdate")}
            id="birthdate"
            onChange={setBirthdate}
            value={birthdate}
            required={true}
          />
          <TextArea
            label={t("input.address")}
            id="address"
            onChange={(e) => setAddress(e.target.value)}
            placeholder={t("other.address")}
            value={address}
            required={true}
          />
          <TextArea
            label={t("input.work-address")}
            id="workaddress"
            onChange={(e) => setWorkAddress(e.target.value)}
            placeholder={t("other.address")}
            value={workAddress}
            required={true}
          />
          <PhoneInput
            label={t("input.phone")}
            id="phone"
            value={phone}
            onChange={setPhone}
            required={true}
          />
          <Input
            label={t("input.email")}
            id="email"
            autoComplete="username"
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("input.email")}
            value={email}
            required={true}
          />
          {email && !isValidEmail(email) && (
            <p className="text-[#ce2222] text-[14px] text-end">
              {t("error.email-valid")}
            </p>
          )}

          <Input
            label={t("input.password")}
            id="password"
            isPassword={true}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="***"
            value={password}
            required={true}
            autoComplete="new-password"
          />
          <Input
            label={t("input.confirm-password")}
            id="confirmPassword"
            isPassword={true}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="***"
            value={confirmPassword}
            required={true}
            autoComplete="new-password"
          />
          {confirmPassword && password !== confirmPassword && (
            <p className="text-[#ce2222] text-[14px] text-end">
              {t("error.password-not-match")}
            </p>
          )}

          <div className="text-[#C6C6C6] text-[16px] my-3">
            <span>{t("other.have-account")} </span>
            <Link to="/login" className="text-white">
              {t("header.login")}
            </Link>
          </div>

          <button
            disabled={btnLoading || !isFormValid}
            className={`w-full border border-[#D9D9D9] py-1 rounded-[5px] ${
              btnLoading || !isFormValid
                ? "bg-[#515151] text-white/50"
                : "bg-[#FFA60C]"
            }`}
          >
            {btnLoading ? t("btn.signup") : t("header.signup")}
          </button>
        </form>
      </section>
    </main>
  );
}
