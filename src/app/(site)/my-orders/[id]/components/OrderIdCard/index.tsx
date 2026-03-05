import { Id } from "@/types";

interface OrderIdCardProps {
  orderId: Id;
}

const OrderIdCard = ({ orderId }: OrderIdCardProps) => {
  return (
    <div className="p-4 sm:p-6 rounded bg-light-light">
      <h2 className="font-semibold sm:text-lg">
        Order Id <span className="text-primary">#{orderId}</span>
      </h2>
    </div>
  );
};

export default OrderIdCard;
