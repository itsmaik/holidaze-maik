import Modal from "@components/globals/Modal";
import Button from "@components/globals/Button";
import { FaMinus, FaPlus } from "react-icons/fa";

type GuestSelectorModalProps = {
  isOpen: boolean;
  adults: number;
  children: number;
  onAdultsChange: (value: number) => void;
  onChildrenChange: (value: number) => void;
  onClose: () => void;
};

export default function GuestSelectorModal({
  isOpen,
  adults,
  children,
  onAdultsChange,
  onChildrenChange,
  onClose,
}: GuestSelectorModalProps) {
  return (
    <Modal isOpen={isOpen} title="Add how many guests" onClose={onClose}>
      <div className="flex items-center justify-center flex-col gap-5">
        <div className="flex items-center gap-2">
          <Button onClick={() => onAdultsChange(Math.max(1, adults - 1))} disabled={adults <= 1}>
            <FaMinus />
          </Button>
          <span>Adults {adults}</span>
          <Button onClick={() => onAdultsChange(adults + 1)}>
            <FaPlus />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => onChildrenChange(Math.max(0, children - 1))} disabled={children <= 0}>
            <FaMinus />
          </Button>
          <span>Children {children}</span>
          <Button onClick={() => onChildrenChange(children + 1)}>
            <FaPlus />
          </Button>
        </div>
        <Button className="w-full !bg-gray-700 text-white" onClick={onClose}>
          Add guests
        </Button>
      </div>
    </Modal>
  );
}
