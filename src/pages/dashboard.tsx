import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/user";
import { logout } from "../lib/auth.services";

export default function Dashboard() {
  const { user } = useUser();

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      dashboard{" "}
      <button
        className="bg-amber-300"
        onClick={async () => {
          await logout();
          console.log("click");
        }}
      >
        Logout
      </button>
    </div>
  );
}
