const OrderSummaryCardSkeleton = () => {
  return (
    <div className="p-4 sm:p-6 rounded bg-light-light">
      <div className="flex items-center justify-between animate-pulse">
        <p className="h-6 w-31 rounded bg-gray-200" />
        <p className="h-5 w-20 rounded-lg bg-gray-200" />
      </div>

      <div className="mt-3 space-y-2 animate-pulse">
        <div className="flex items-center justify-between">
          <p className="h-4 w-24 rounded bg-gray-200" />
          <p className="h-3 w-22 rounded bg-gray-200" />
        </div>
        <div className="flex items-center justify-between">
          <p className="h-4 w-22 rounded bg-gray-200" />
          <p className="h-3 w-16 rounded bg-gray-200" />
        </div>
        <div className="flex items-center justify-between">
          <p className="h-4 w-18 rounded bg-gray-200" />
          <p className="h-3 w-12 rounded bg-gray-200" />
        </div>
        <div className="flex items-center justify-between">
          <p className="h-4 w-23 rounded bg-gray-200" />
          <p className="h-3 w-8 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryCardSkeleton;
