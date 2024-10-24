
type TButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
}

export default function Button ({onClick, children}: TButtonProps) {
  return (
    <button className="border rounded-md py-2 px-4 font-semibold bg-white  text-black" onClick={onClick}>{children}</button>
  )
};