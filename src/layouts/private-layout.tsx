import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../hooks/user";

export default function PrivateLayout() {
  const { user, loading } = useUser();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="w-full h-svh">
      <Outlet />
    </main>
  );
}
