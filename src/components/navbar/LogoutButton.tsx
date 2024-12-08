import { useAuth } from "@hooks/useAuth";
import { LuLogOut } from "react-icons/lu";

export default function LogoutButton() {
  const { logout } = useAuth();

  return (
    <button
      onClick={logout}
      className="flex flex-col items-center justify-center border rounded-md py-1 px-4 font-semibold bg-white bg-opacity-20 hover:bg-opacity-100 text-black"
      aria-label="Logout"
    >
      <LuLogOut className="text-2xl" />
    </button>
  );
}
