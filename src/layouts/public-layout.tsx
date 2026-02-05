import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <main className="w-full max-w-107.5 mx-auto h-svh">
      <Outlet />
    </main>
  );
}
