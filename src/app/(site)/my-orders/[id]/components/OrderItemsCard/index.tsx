import CustomizedProductInfo from "@/components/ui/CustomizedProductInfo";
import CustomizedProductPreview from "@/components/ui/CustomizedProductPreview";
import { CartItemType } from "@/types/cart";
import clsx from "clsx";

interface OrderItemsCardProps {
  orderItems: CartItemType[];
}

const OrderItemsCard = ({ orderItems }: OrderItemsCardProps) => {
  return (
    <div className="p-4 sm:p-6 pb-0 sm:pb-0 rounded bg-light-light">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold sm:text-lg">Order Items</h3>
        <p className="text-sm text-dark-light">{orderItems.length} items</p>
      </div>

      <div className="divide-y">
        {orderItems.map((item) => {
          const { _id, name, quantity, subtotal, customizations } = item || {};

          return (
            <div key={_id} className="py-4">
              <div
                className={clsx(
                  "grid grid-cols-[1fr_1.5fr]",
                  "sm:grid-cols-[140px_4fr_1fr_1fr]",
                  "md:grid-cols-[140px_2fr_1fr_1fr]",
                  "lg:grid-cols-[140px_4fr_1fr_1fr]",
                  "xl:grid-cols-[140px_1fr_1fr_1fr]",
                  "gap-4 sm:gap-6 sm:items-center",
                )}
              >
                <CustomizedProductPreview item={item} />

                <div className="min-w-0">
                  <CustomizedProductInfo
                    customizations={customizations}
                    name={name}
                  />

                  <div className="sm:hidden ms-1 mt-2 flex justify-between text-xs font-medium text-dark-light">
                    <p>QTY: {quantity}</p>
                    <p>${subtotal}</p>
                  </div>
                </div>

                <p className="hidden sm:block font-medium text-sm text-dark-light text-nowrap justify-self-center">
                  <span className="text-xs">X</span> {quantity}
                </p>

                <p className="hidden sm:block font-medium text-dark-light text-sm justify-self-end">
                  ${subtotal}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderItemsCard;
