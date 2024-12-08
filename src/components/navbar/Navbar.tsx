import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@hooks/useAuth";
import { useNavigate } from "react-router-dom";
import heroImg from "src/assets/bg-img-1.avif"
import Button from "@components/globals/Button";
import Modal from "@components/globals/Modal";
import Login from "@components/auth/login/Login";
import Register from "@components/auth/register/Register";
import SearchBarForm from "../searchbar/SearchBarForm";
import { CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";

export default function Navbar() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  const navigate = useNavigate();
  const heroImage = heroImg;
  const isProfilePage = location.pathname === "/profile";

  const handleNavigate = () => {
    navigate("/profile");
  };

  return (
    <nav
      className={`relative w-full ${
        isProfilePage ? "h-20" : "h-96"
      } bg-cover`}
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className='relative z-10 flex items-center justify-between p-6'>
        <Link to={`/`}>
          <div className='text-black font-bold text-2xl'>Holidaze</div>
        </Link>

        {!isLoggedIn ? (
          <div className='flex space-x-2'>
            <Button onClick={() => setLoginOpen(true)}> Login </Button>
            <Button onClick={() => setRegisterOpen(true)}> Register </Button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 items-center">
            {/* Profile Button */}
            <button
              onClick={handleNavigate}
              className="flex flex-col items-center justify-center border rounded-md py-1 px-4 font-semibold bg-white text-black"
              aria-label="Profile"
            >
              <CgProfile className="text-2xl" />
            </button>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="flex flex-col items-center justify-center border rounded-md py-1 px-4 font-semibold bg-white bg-opacity-20 hover:bg-opacity-100 text-black"
              aria-label="Logout"
            >
              <LuLogOut className="text-2xl" />
            </button>
          </div>

        )}
        <Modal
          isOpen={isLoginOpen}
          onClose={() => setLoginOpen(false)}
          title='Login with an existing account'
        >
          <Login onSuccess={() => setLoginOpen(false)} />
        </Modal>

        <Modal
          isOpen={isRegisterOpen}
          onClose={() => setRegisterOpen(false)}
          title='Register a new user account'
        >
          <Register onSuccess={() => setRegisterOpen(false)} />
        </Modal>
      </div>

      {!isProfilePage && (
        <div className="relative z-1 flex flex-col items-center justify-center h-80 px-6">
          <SearchBarForm />
        </div>
      )}
    </nav>
  );
}
