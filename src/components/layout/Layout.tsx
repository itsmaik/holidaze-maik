import { useLocation, useNavigate } from "react-router-dom";
import Modal from "@components/globals/Modal";
import Login from "@components/auth/login/Login";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const isLoginRoute = location.pathname === "/login";

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-grow w-full'>
        <Outlet />
      </main>
      <Footer />
      {isLoginRoute && (
        <Modal
          isOpen={true}
          onClose={() => navigate(-1)}
          title='Login with an existing account'
        >
          <Login onSuccess={() => navigate(-1)} />
        </Modal>
      )}
    </div>
  );
}
