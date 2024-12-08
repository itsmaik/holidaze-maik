import { useState } from "react";
import Modal from "@components/globals/Modal";
import EditVenueForm from "./EditVenueForm";

export default function EditVenueModal({ venue }) {
  const [isEditOpen, setEditOpen] = useState(false);

  return (
    <>
      <button onClick={() => setEditOpen(true)} className="bg-blue-600 text-white py-2 px-4 rounded-md">
        Edit Venue
      </button>

      <Modal isOpen={isEditOpen} onClose={() => setEditOpen(false)} title="Edit Venue">
        <EditVenueForm venue={venue} />
      </Modal>
    </>
  );
}
