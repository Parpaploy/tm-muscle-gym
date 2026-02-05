import { Outlet } from "react-router-dom";

export default function PrivateLayout() {
  return (
    <main className="w-full h-svh">
      <Outlet />
    </main>
  );
}
