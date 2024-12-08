import { useModal } from "@hooks/useModal";
import Modal from "@components/globals/Modal";
import Login from "@components/auth/login/Login";
import Button from "@components/globals/Button";

export default function LoginModal() {
  const { isLoginOpen, setLoginOpen } = useModal();

  return (
    <>
      <Button onClick={() => setLoginOpen(true)} className="btn">
        Login
      </Button>
      <Modal
        isOpen={isLoginOpen}
        onClose={() => setLoginOpen(false)}
        title="Login with an existing account"
      >
        <Login onSuccess={() => setLoginOpen(false)} />
      </Modal>
    </>
  );
}
