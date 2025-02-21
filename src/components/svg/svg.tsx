export function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={30}
      height={30}
      viewBox='0 0 30 30'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <title>Star Icon</title>
      <path
        d='M29.92 10.77a1.502 1.502 0 00-1.301-1.014l-8.552-.68-3.7-8.19a1.496 1.496 0 00-2.733-.001l-3.7 8.192-8.552.68a1.5 1.5 0 00-.929 2.568l6.32 6.16-2.235 9.677a1.5 1.5 0 002.295 1.585L15 24.303l8.168 5.444a1.502 1.502 0 002.275-1.659L22.7 18.49l6.804-6.122a1.502 1.502 0 00.417-1.597z'
        fill='#484848'
      />
    </svg>
  );
}
export function HalfStarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={30}
      height={30}
      viewBox='0 0 30 30'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <title>Half Star Icon</title>
      <defs>
        <clipPath id='half'>
          <rect x='0' y='0' width='15' height='30' />
        </clipPath>
      </defs>
      <path
        d='M29.92 10.77a1.502 1.502 0 00-1.301-1.014l-8.552-.68-3.7-8.19a1.496 1.496 0 00-2.733-.001l-3.7 8.192-8.552.68a1.5 1.5 0 00-.929 2.568l6.32 6.16-2.235 9.677a1.5 1.5 0 002.295 1.585L15 24.303l8.168 5.444a1.502 1.502 0 002.275-1.659L22.7 18.49l6.804-6.122a1.502 1.502 0 00.417-1.597z'
        fill='#484848'
        clipPath='url(#half)'
      />
    </svg>
  );
}
export function EmptyStarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={30}
      height={30}
      viewBox='0 0 30 30'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <title>Empty Star Icon</title>
      <path
        d='M29.92 10.77a1.502 1.502 0 00-1.301-1.014l-8.552-.68-3.7-8.19a1.496 1.496 0 00-2.733-.001l-3.7 8.192-8.552.68a1.5 1.5 0 00-.929 2.568l6.32 6.16-2.235 9.677a1.5 1.5 0 002.295 1.585L15 24.303l8.168 5.444a1.502 1.502 0 002.275-1.659L22.7 18.49l6.804-6.122a1.502 1.502 0 00.417-1.597z'
        stroke='#484848'
        fill='none'
      />
    </svg>
  );
}
export function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={12}
      height={12}
      viewBox='0 0 12 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <title>X Icon</title>
      <path
        d='M.048 12l4.816-6.64v1.888L.256.8H3.2l3.184 4.496-1.232.016L8.288.8h2.816L6.528 7.136V5.28L11.376 12H8.384L5.088 7.248h1.184L3.024 12H.048z'
        fill='#E71515'
      />
    </svg>
  );
}
export function SuccessIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={14}
      height={17}
      viewBox='0 0 14 17'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <title>Success Icon</title>
      <path d='M1 6l4.5 8.5L10 6l2.5-5' stroke='#29A64D' strokeWidth={2} />
    </svg>
  );
}
