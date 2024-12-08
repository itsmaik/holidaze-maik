import { useModal } from "@hooks/useModal";
import Modal from "@components/globals/Modal";
import Register from "@components/auth/register/Register";
import Button from "@components/globals/Button";

export default function RegisterModal() {
  const { isRegisterOpen, setRegisterOpen } = useModal();

  return (
    <>
      <Button onClick={() => setRegisterOpen(true)} className="btn">
        Register
      </Button>
      <Modal
        isOpen={isRegisterOpen}
        onClose={() => setRegisterOpen(false)}
        title="Register a new user account"
      >
        <Register onSuccess={() => setRegisterOpen(false)} />
      </Modal>
    </>
  );
}
