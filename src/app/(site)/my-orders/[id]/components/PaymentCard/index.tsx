import { OrderType } from "@/types/order";

interface PaymentCardProps {
  order: OrderType;
}

const PaymentCard = ({ order }: PaymentCardProps) => {
  const { paymentMethod, totalPrice } = order || {};

  return (
    <div className="p-4 sm:p-6 rounded bg-light-light">
      <h3 className="font-semibold sm:text-lg">Payment Info</h3>

      <div className="mt-2 text-sm space-y-1 text-dark-light">
        <div className="flex items-center justify-between">
          <p className="font-medium">Payment Method</p>
          <p className="capitalize">{paymentMethod}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="font-medium">Total Paid</p>
          <p>${totalPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
