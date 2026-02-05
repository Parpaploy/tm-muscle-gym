import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { loginWithEmail } from "../lib/auth.services";
import { useUser } from "../hooks/user";

export default function Login() {
  const { user, loading } = useUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <Navigate to="/private" replace />;
  }

  const handleLogin = async () => {
    try {
      const result = await loginWithEmail(email, password);

      if (result.role === "admin") {
        navigate("/private/dashboard", { replace: true });
      } else {
        navigate("/private", { replace: true });
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Login failed");
      }
    }
  };

  return (
    <>
      <input onChange={(e) => setEmail(e.target.value)} />
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </>
  );
}
