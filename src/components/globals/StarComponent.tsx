import { EmptyStarIcon, HalfStarIcon, StarIcon } from "@components/svg/svg";
type Props = {
  rating: number;
};
export default function StarComponent({ rating }: Props) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  return (
    <div className='flex items-center gap-2'>
      {Array.from({ length: fullStars }).map((_, index) => (
        <StarIcon key={`full-${index + 1}`} />
      ))}
      {hasHalfStar && <HalfStarIcon />}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <EmptyStarIcon key={`empty-${index + 1}`} />
      ))}
    </div>
  );
}
