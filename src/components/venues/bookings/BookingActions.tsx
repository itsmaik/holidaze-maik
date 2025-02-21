type BookingActionProps = {
  title: string;
  onClick: () => void;
  displayValue?: string;
  hasLine?: boolean;
};

export default function BookingAction({ title, onClick, displayValue, hasLine = false }: BookingActionProps) {
  return (
    <div className="flex flex-col gap-1 relative">
      {hasLine && <div className="h-px w-full bg-gray-100 sm:hidden my-5" />}
      <strong className="text-xs block">{title}</strong>
      <button
        className="border-0 text-gray-300 text-sm w-fit !p-0 mx-auto sm:mx-0"
        onClick={onClick}
      >
        {displayValue || `Add ${title}`}
      </button>
      {hasLine && <div className="w-px h-9 bg-gray-100 text absolute -left-6 sm:block hidden" />}
    </div>
  );
}
