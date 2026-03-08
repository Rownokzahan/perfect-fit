const DeliveryInfoFormSkeleton = () => {
  return (
    <div className="p-4 sm:p-6 rounded bg-light-light space-y-4">
      <div className="h-7 sm:h-6 w-26 rounded bg-gray-200 animate-pulse" />

      <div className="space-y-5 animate-pulse">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="h-12.5 rounded bg-gray-200" />
        ))}
      </div>
    </div>
  );
};

export default DeliveryInfoFormSkeleton;
