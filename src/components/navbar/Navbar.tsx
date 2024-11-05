import Button from "@components/globals/Button"
import Modal from "@components/globals/Modal";
import Login from "@components/auth/login/Login";
import { useState } from "react"
import Register from "@components/auth/register/Register";

export default function Navbar () {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  return (
    <nav className="relative w-full h-96 bg-cover" style={{backgroundImage: `url('/src/assets/bg-img-1.avif')` }}>

      <div className="relative z-10 flex items-center justify-between p-6">
        <div className="text-black font-bold text-2xl">Holidaze</div>

        <div className="flex space-x-2 text-black">
          <Button onClick={() => setLoginOpen(true)}> Login </Button>
          <Button onClick={() => setRegisterOpen(true)}> Register </Button>
        </div>

        <Modal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} title="Login with an existing account" >
          <Login />
        </Modal>

        <Modal isOpen={isRegisterOpen} onClose={() => setRegisterOpen(false)} title="Register a new user account" >
          <Register />
        </Modal>

      </div>

      <div className="relative z-1 flex items-center justify-center h-full px-6">
        <h1 className="text-2xl bg-black text-white p-2">Calendar content here</h1>
      </div>
    </nav>
  )
}