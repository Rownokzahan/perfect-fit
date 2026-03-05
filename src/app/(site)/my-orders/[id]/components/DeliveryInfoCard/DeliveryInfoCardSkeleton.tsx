const DeliveryInfoCardSkeleton = () => {
  return (
    <div className="p-4 sm:p-6 rounded bg-light-light">
      <div className="mt-1 h-5 w-32 rounded bg-gray-200 animate-pulse" />

      <div className="mt-3 space-y-2 animate-pulse">
        <p className="h-4 w-36 rounded bg-gray-200" />
        <p className="h-4 w-38 rounded bg-gray-200" />

        <p className="h-4 w-35 rounded bg-gray-200" />
        <p className="h-4 w-52 rounded bg-gray-200" />
      </div>
    </div>
  );
};

export default DeliveryInfoCardSkeleton;
