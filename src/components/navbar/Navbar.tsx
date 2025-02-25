import { Link, useLocation } from "react-router-dom";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import ProfileButton from "@components/navbar/ProfileButton";
import LogoutButton from "@components/navbar/LogoutButton";
import SearchBarForm from "../globals/SearchBarForm";
import heroImg from "src/assets/bg-img-1.avif";
import { useAuth } from "@hooks/useAuth";
import { JSX } from "react";

export default function Navbar(): JSX.Element {
  // Destructure pathname for concise conditional rendering
  const { pathname } = useLocation();
  const isProfilePage = pathname === "/profile";
  const { isLoggedIn } = useAuth();

  // Dynamically set the navbar height based on the current route
  const navHeight = isProfilePage ? "h-20" : "h-96";

  return (
    <nav
      className={`relative w-full ${navHeight} bg-cover`}
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className='relative z-10 flex items-center justify-between p-6'>
        {/* Logo linking back to home */}
        <Link to='/'>
          <div className='text-black font-bold text-3xl'>Holidaze</div>
        </Link>

        <div className='flex items-center gap-4'>
          {/* Conditionally render authentication modals or profile options */}
          {!isLoggedIn ? (
            <>
              <LoginModal />
              <RegisterModal />
            </>
          ) : (
            <>
              <ProfileButton />
              <LogoutButton />
            </>
          )}
        </div>
      </div>

      {/* Render the search bar only on pages other than the profile */}
      {!isProfilePage && (
        <div className='relative z-1 flex flex-col items-center justify-center h-80 sm:h-72 md:h-96 lg:h-96 px-6'>
          <SearchBarForm />
        </div>
      )}
    </nav>
  );
}
