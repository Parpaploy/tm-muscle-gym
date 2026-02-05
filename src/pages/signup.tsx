import { useState } from "react";
import { signupWithEmail } from "../lib/auth.services";
import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/user";

export default function Signup() {
  const { user } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to="/private" replace />;
  }
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signupWithEmail(email, password);
      alert("สมัครสำเร็จ 🎉");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Sign up failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button disabled={loading}>{loading ? "กำลังสมัคร..." : "สมัคร"}</button>
    </form>
  );
}
