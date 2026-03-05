const OrderCardSkeleton = () => {
  return (
    <div className="p-4 rounded bg-light-light flex gap-4">
      <div className="w-20 aspect-8/11 rounded bg-gray-200 animate-pulse" />

      <div className="flex-1 min-w-0 animate-pulse">
        <p className="h-5 w-9/12 mb-4 rounded bg-gray-200" />
        <p className="h-4 w-7/12 mb-2 rounded bg-gray-200" />
        <p className="h-4 w-22 mb-3 rounded bg-gray-200" />
        <p className="h-4 w-16 rounded bg-gray-200" />
      </div>
    </div>
  );
};

export default OrderCardSkeleton;
