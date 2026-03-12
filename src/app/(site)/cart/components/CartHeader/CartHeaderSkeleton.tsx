const CartHeaderSkeleton = () => {
  return (
    <div className="mt-6 flex justify-between gap-6 animate-pulse">
      <div className="space-y-2">
        <div className="h-8 w-55 rounded bg-gray-200" />
        <div className="h-5 w-50 rounded bg-gray-200" />
      </div>

      <div className="h-4 w-14 bg-gray-200" />
    </div>
  );
};

export default CartHeaderSkeleton;
