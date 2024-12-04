import useCurrencyFormatter from "@hooks/useCurrencyFormatter";

type Props = {
  owner: string;
  price: number;
};

export default function ListedBy({ owner, price }: Props) {
  const formattedPrice = useCurrencyFormatter(price);
  return (
    <div className='flex items-end gap-5'>
      <div className='sm:size-[76px] size-14 rounded-full bg-white'/>
      <div className='flex flex-col items-start gap-y-1'>
        <span className='font-medium text-xs bg-white px-2 rounded-full text-gray-800'>Listed By:</span>
        <strong className='font-medium text-sm bg-white px-2 rounded-full text-gray-800'>
          {owner}
        </strong>
        <span className='font-medium text-sm bg-white px-2 rounded-full text-gray-800'>
          For: {formattedPrice} per night
        </span>
      </div>
    </div>
  );
}
