import { FaTimes } from "react-icons/fa";

type TModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: TModalProps) {
  
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 w-full max-w-md mx-4 flex flex-col'>
        <div className='flex justify-between mb-4'>
          <h2 className='text-xl font-semibold text-gray-600'>{title}</h2>
          <button
            type='button'
            aria-label='close modal'
            onClick={onClose}
            className=' text-black text-xl hover:text-red-900'
          >
            <FaTimes />
          </button>
        </div>
        <div className='mt-8 overflow-y-auto' style={{maxHeight: 'calc(100vh - 200px)'}}>
          {children}
        </div>
      </div>
    </div>
  );
}
