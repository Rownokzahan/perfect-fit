const YourCartSkeleton = () => {
  return (
    <div className="h-max p-4 sm:p-6 rounded bg-light-light">
      <div className="flex justify-between items-center animate-pulse">
        <p className="h-6 sm:h-7 w-31 rounded bg-gray-200" />
        <p className="h-5 w-8 rounded bg-gray-200" />
      </div>

      <div className="my-4 space-y-2 animate-pulse">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="h-5 rounded bg-gray-200" />
        ))}
      </div>

      <div className="h-6 rounded bg-gray-200 animate-pulse" />

      <div className="mt-6 h-10.5 rounded-sm bg-gray-200 animate-pulse" />
    </div>
  );
};

export default YourCartSkeleton;
