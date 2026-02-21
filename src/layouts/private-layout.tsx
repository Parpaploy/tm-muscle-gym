import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../hooks/user";
import GlobalLoading from "../components/global-loading";
import PrivateNavbar from "../components/private-navbar";

export default function PrivateLayout() {
  const { user, loading } = useUser();

  if (loading)
    return (
      <main className="w-full max-w-107.5 mx-auto min-h-screen bg-[#515151] flex items-center justify-center">
        <GlobalLoading />
      </main>
    );

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="w-full max-w-107.5 mx-auto h-[93svh] mt-[7svh] bg-[#515151] overflow-y-auto">
      <PrivateNavbar />

      <Outlet />
    </main>
  );
}
