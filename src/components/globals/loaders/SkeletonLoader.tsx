
export default function SkeletonLoader() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
      {
        Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse w-full max-w-sm p-4 border border-gray-300 rounded-lg shadow-lg"
          >
            <div className="h-48 bg-gray-300 rounded mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        ))
      }
    </div>
  );
};
