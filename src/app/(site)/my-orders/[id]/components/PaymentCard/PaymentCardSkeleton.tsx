const PaymentCardSkeleton = () => {
  return (
    <div className="p-4 sm:p-6 rounded bg-light-light">
      <div className="mt-1 h-5 w-30 rounded bg-gray-200 animate-pulse" />

      <div className="mt-3 space-y-2 animate-pulse">
        <div className="flex items-center justify-between">
          <p className="h-4 w-32 rounded bg-gray-200" />
          <p className="h-4 w-26 rounded bg-gray-200" />
        </div>

        <div className="flex items-center justify-between">
          <p className="h-4 w-23 rounded bg-gray-200" />
          <p className="h-4 w-14 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default PaymentCardSkeleton;