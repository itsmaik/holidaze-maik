import { useState } from "react";
import Modal from "@components/globals/Modal";
import EditProfileForm from "@components/profile/EditProfileForm";

export default function EditProfileModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
      >
        Edit Profile
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Edit Profile">
        <EditProfileForm />
      </Modal>
    </>
  );
}
