import Modal from "@components/globals/Modal";
import Calendar from "react-calendar";

type CalendarModalProps = {
  isOpen: boolean;
  title: string;
  value: Date;
  minDate?: Date;
  onClose: () => void;
  onChange: (value: Date) => void;
};

export default function CalendarModal({ isOpen, title, value, minDate, onClose, onChange }: CalendarModalProps) {
  return (
    <Modal isOpen={isOpen} title={title} onClose={onClose}>
      <div className="flex items-center justify-center">
        <Calendar value={value} minDate={minDate} onChange={(value) => value instanceof Date && onChange(value)} />
      </div>
    </Modal>
  );
}
