import { logout } from "../lib/auth.services";

export default function Homepage() {
  return (
    <div>
      Homepage
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
