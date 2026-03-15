const OutOfStockOverlay = () => {
  return (
    <span className="absolute inset-0 bg-dark/50 grid place-items-center">
      <span className="px-4 py-1 rounded-full bg-secondary text-light-light text-sm uppercase font-medium">
        Out of Stock
      </span>
    </span>
  );
};

export default OutOfStockOverlay;