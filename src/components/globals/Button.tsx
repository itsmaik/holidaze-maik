type TButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  onClick,
  children,
  type,
  className,
}: TButtonProps) {
  return (
    <button
      type={type}
      className={`border rounded-md py-2 px-4 font-semibold text-white hover:bg-blue-600 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
