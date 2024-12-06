import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@hooks/useAuth";
import heroImg from "src/assets/bg-img-1.avif"
import Button from "@components/globals/Button";
import Modal from "@components/globals/Modal";
import Login from "@components/auth/login/Login";
import Register from "@components/auth/register/Register";
import SearchBarForm from "../searchbar/SearchBarForm";
import CreateVenue from "@components/venues/actions/create-venue/CreateVenue";

export default function Navbar() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isVenueOpen, setVenueOpen] = useState(false);

  const { isLoggedIn, logout } = useAuth();

  const heroImage = heroImg;

  return (
    <nav
      className='relative w-full h-96 bg-cover'
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className='relative z-10 flex items-center justify-between p-6'>
        <Link to={`/`}>
          <div className='text-black font-bold text-2xl'>Holidaze</div>
        </Link>

        {!isLoggedIn ? (
          <div className='flex space-x-2 text-black'>
            <Button onClick={() => setLoginOpen(true)}> Login </Button>
            <Button onClick={() => setRegisterOpen(true)}> Register </Button>
          </div>
        ) : (
          <div className='flex space-x-2 text-black'>
            <Button onClick={() => setVenueOpen(true)}> Create Venue </Button>
            <Button onClick={logout}> Logout </Button>
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

        <Modal
          isOpen={isVenueOpen}
          onClose={() => setVenueOpen(false)}
          title='Create a new Venue'
        >
          <CreateVenue />
        </Modal>
      </div>

      <div className='relative z-1 flex flex-col items-center justify-center h-80 px-6'>
        <SearchBarForm />
      </div>
    </nav>
  );
}
