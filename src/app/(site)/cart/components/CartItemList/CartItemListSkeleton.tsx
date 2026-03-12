const CartItemListSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="h-4 rounded bg-gray-200 animate-pulse" />

      {[...Array(3)].map((_, index) => (
        <div key={index} className="p-4 rounded bg-light-light">
          <div className="h-40 rounded bg-gray-200 animate-pulse" />
        </div>
      ))}
    </div>
  );
};

export default CartItemListSkeleton;
