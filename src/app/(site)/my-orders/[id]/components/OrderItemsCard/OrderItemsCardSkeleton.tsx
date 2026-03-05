const OrderItemsCardSkeleton = () => {
  return (
    <div className="p-4 sm:p-6 pb-0 sm:pb-0 rounded bg-light-light">
      <div className="mt-1 flex items-center justify-between animate-pulse">
        <p className="h-5 w-31 rounded bg-gray-200" />
        <p className="h-4 w-20 rounded-lg bg-gray-200" />
      </div>

      <div className="divide-y">
        {[...Array(3)].map((_, idx) => (
          <div key={idx} className="py-4 animate-pulse">
            <div className="h-48 bg-gray-200 rounded"/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderItemsCardSkeleton;
