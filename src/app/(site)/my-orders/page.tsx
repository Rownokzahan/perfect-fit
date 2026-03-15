import OrderCard from "./components/OrderCard";
import NoOrderFound from "./components/NoOrderFound";
import { getUserOrders } from "@/actions/orders/queries/getUserOrders";

export const metadata = {
  title: "My Orders",
};

const MyOrdersPage = async () => {
  const orders = await getUserOrders();

  if (orders.length === 0) {
    return <NoOrderFound />;
  }

  return (
    <div className="ui-container mt-8 mb-12">
      <h2 className="mb-8 text-2xl text-center">My Orders</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default MyOrdersPage;

