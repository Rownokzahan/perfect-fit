const OrderIdCardSkeleton = () => {
  return (
    <div className="p-4 sm:p-6 rounded bg-light-light sm:flex gap-1 items-center">
      <div className="h-5 w-16 my-1 rounded bg-gray-200 animate-pulse" />
      <div className="h-5 w-60 rounded bg-gray-200 animate-pulse" />
    </div>
  );
};

export default OrderIdCardSkeleton;
