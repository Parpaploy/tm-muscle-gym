import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { loginWithEmail } from "../lib/auth.services";
import { useUser } from "../hooks/user";
import Input from "../components/input";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import GlobalLoading from "../components/global-loading";

export default function Login() {
  const { user, loading } = useUser();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const isFormValid = isValidEmail(email.trim()) && password.trim().length > 0;

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    setBtnLoading(true);

    try {
      const result = await loginWithEmail(email, password);

      if (result.role === "admin") {
        navigate("/private/dashboard", { replace: true });
      } else {
        navigate("/private", { replace: true });
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        Swal.fire({
          background: "#2E2E2E",
          color: "#fff",
          icon: "error",
          title: t("error.login-failed"),
          text: err.message,
          confirmButtonColor: "#FFA60C",
        });
      } else {
        Swal.fire({
          background: "#2E2E2E",
          color: "#fff",
          icon: "error",
          title: t("error.error-occurred"),
          text: t("error.login-failed"),
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

      <section className="px-3 py-5 w-[85%] h-auto bg-[#8C8C8C] border border-[#D9D9D9] text-center text-white rounded-[5px] space-y-3">
        <h1 className="text-[16px]">{t("header.login")}</h1>

        <form className="space-y-1" onSubmit={handleLogin}>
          <Input
            label={t("input.email")}
            id="email"
            autoComplete="username"
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("input.email")}
            value={email}
          />
          {email && !isValidEmail(email) && (
            <p className="text-[#ce2222] text-[14px] text-end">
              {t("error.email-vaild")}
            </p>
          )}

          <Input
            label={t("input.password")}
            id="password"
            isPassword={true}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="***"
            value={password}
            autoComplete="current-password"
          />

          <div className="text-[#C6C6C6] flex flex-col gap-y-2 text-[16px] my-3">
            <span>{t("other.forgot-password")}</span>

            <span>
              {t("other.no-account")}{" "}
              <Link to="/signup" className="text-white">
                {t("header.signup")}
              </Link>
            </span>
          </div>

          <button
            disabled={btnLoading || !isFormValid}
            className={`w-full border border-[#D9D9D9] py-1 rounded-[5px] ${
              btnLoading || !isFormValid
                ? "bg-[#515151] text-white/50"
                : "bg-[#FFA60C]"
            }`}
          >
            {btnLoading ? t("btn.login") : t("header.login")}
          </button>
        </form>
      </section>
    </main>
  );
}
