import { useState } from "react";
import Modal from "@components/globals/Modal";
import CreateVenue from "@components/venues/actions/create-venue/CreateVenue";

export default function CreateVenueModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
      >
        New Venue
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Create a new Venue">
        <CreateVenue />
      </Modal>
    </>
  );
}
