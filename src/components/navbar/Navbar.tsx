import { Link, useLocation } from "react-router-dom";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import ProfileButton from "@components/navbar/ProfileButton";
import LogoutButton from "@components/navbar/LogoutButton";
import SearchBarForm from "../searchbar/SearchBarForm";
import heroImg from "src/assets/bg-img-1.avif";
import { useAuth } from "@hooks/useAuth";

export default function Navbar() {
  const location = useLocation();
  const isProfilePage = location.pathname === "/profile";
  const {isLoggedIn} = useAuth();

  return (
    <nav
      className={`relative w-full ${
        isProfilePage ? "h-20" : "h-96"
      } bg-cover`}
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className="relative z-10 flex items-center justify-between p-6">
        <Link to="/">
          <div className="text-black font-bold text-2xl">Holidaze</div>
        </Link>

        <div className="flex items-center gap-4">
          {/* Conditional Rendering for Auth Buttons */}
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

      {/* Search Bar for Non-Profile Pages */}
      {!isProfilePage && (
        <div className="relative z-1 flex flex-col items-center justify-center h-80 px-6">
          <SearchBarForm />
        </div>
      )}
    </nav>
  );
}
