import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

export default function ProfileButton() {
  const navigate = useNavigate();

  const handleNavigate = () => navigate("/profile");

  return (
    <button
      onClick={handleNavigate}
      className="flex flex-col items-center justify-center border rounded-md py-1 px-4 font-semibold bg-white text-black"
      aria-label="Profile"
    >
      <CgProfile className="text-2xl" />
    </button>
  );
}
