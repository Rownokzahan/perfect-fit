import OrderCardSkeleton from "./components/OrderCard/OrderCardSkeleton";

const MyOrdersLoadingPage = () => {
  return (
    <div className="ui-container mt-8 mb-12 sm:mt-12">
      <h2 className="mb-6 text-2xl font-semibold text-center">My Orders</h2>

      <div className="space-y-4">
        {[...Array(4)].map((_, idx) => (
          <OrderCardSkeleton key={idx} />
        ))}
      </div>
    </div>
  );
};

export default MyOrdersLoadingPage;
