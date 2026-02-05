import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/user";

export default function Dashboard() {
  const { user } = useUser();

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <div>dashboard</div>;
}
