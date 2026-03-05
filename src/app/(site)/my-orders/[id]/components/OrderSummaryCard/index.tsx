import { OrderType } from "@/types/order";
import OrderSummaryCardRow from "./OrderSummaryCardRow";
import OrderStatusBadge from "@/components/ui/OrderStatusBadge";

interface OrderSummaryCardProps {
  order: OrderType;
}

const OrderSummaryCard = ({ order }: OrderSummaryCardProps) => {
  const { createdAt, status, totalPrice } = order || {};

  const date = new Date(createdAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="p-4 sm:p-6 rounded bg-light-light">
      <div className="flex justify-between items-center gap-3">
        <h3 className="font-semibold sm:text-lg">Order Summary</h3>
        <OrderStatusBadge status={status} />
      </div>

      <div className="mt-2 text-sm space-y-1">
        <OrderSummaryCardRow label="Order Created" value={formattedDate} />
        <OrderSummaryCardRow label="Order Time" value={formattedTime} />
        <OrderSummaryCardRow label="Subtotal" value={`$${totalPrice}`} />
        <OrderSummaryCardRow label="Delivery Fee" value={`$0`} />
      </div>
    </div>
  );
};

export default OrderSummaryCard;
