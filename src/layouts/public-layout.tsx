import { Outlet } from "react-router-dom";
import PublicNavbar from "../components/public-navbar";

export default function PublicLayout() {
  return (
    <main className="w-full max-w-107.5 mx-auto h-[93svh] mt-[7svh] bg-[#515151]">
      <PublicNavbar />

      <Outlet />
    </main>
  );
}
