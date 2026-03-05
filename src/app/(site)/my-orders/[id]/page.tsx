import { Id } from "@/types";
import OrderNotFound from "./components/OrderNotFound";
import { getOrderById } from "@/actions/orders/queries/getOrderById";
import MyOrderDetailsContainer from "./components/MyOrderDetailsContainer";
import OrderIdCard from "./components/OrderIdCard";
import OrderItemsCard from "./components/OrderItemsCard";
import OrderSummaryCard from "./components/OrderSummaryCard";
import PaymentCard from "./components/PaymentCard";
import DeliveryInfoCard from "./components/DeliveryInfoCard";

interface Params {
  params: Promise<{ id: Id }>;
}

export async function generateMetadata({ params }: Params) {
  const orderId = (await params).id;

  return {
    title: `Order #${orderId} Details`,
  };
}

const MyOrderDetailsPage = async ({ params }: Params) => {
  const orderId = (await params).id;
  const order = await getOrderById(orderId);

  if (!order) {
    return <OrderNotFound />;
  }

  const { _id, items, deliveryInfo } = order || {};

  return (
    <MyOrderDetailsContainer>
      <div className="space-y-5">
        <OrderIdCard orderId={_id} />
        <OrderItemsCard orderItems={items} />
      </div>

      <div className="space-y-4">
        <OrderSummaryCard order={order} />
        <PaymentCard order={order} />
        <DeliveryInfoCard deliveryInfo={deliveryInfo} />
      </div>
    </MyOrderDetailsContainer>
  );
};

export default MyOrderDetailsPage;
