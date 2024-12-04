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
      className={`border rounded-md py-2 px-4 font-semibold bg-white  text-black ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
