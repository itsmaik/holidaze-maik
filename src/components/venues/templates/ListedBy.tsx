import useCurrencyFormatter from "@hooks/useCurrencyFormatter";

type Props = {
  owner: string;
  price: number;
};

export default function ListedBy({ owner, price }: Props) {
  const formattedPrice = useCurrencyFormatter(price);
  return (
    <div className='flex items-end'>
      <div className='flex flex-col items-start'>
        <span className='font-medium text-xs px-2 rounded-full text-black'>Listed By:</span>
        <strong className='font-medium text-md px-2 rounded-full text-black'>
          {owner}
        </strong>
        <span className='font-medium text-sm px-2 rounded-full text-black'>
          For: {formattedPrice} per night
        </span>
      </div>
    </div>
  );
}
