import CheckoutButton from "./CheckoutButton";
import { LuLock } from "react-icons/lu";

interface CartSummaryProps {
  availableItemsTotal: number;
  availableCount: number;
  notAvailableCount: number;
}

const CartSummary = ({
  availableCount,
  availableItemsTotal,
  notAvailableCount,
}: CartSummaryProps) => {
  return (
    <div className="h-max p-4 sm:p-6 rounded bg-light-light sticky top-16">
      <div className="flex justify-between items-center">
        <h3 className="sm:text-lg">Cart Summary</h3>
        <p className="text-dark-light text-sm">
          {availableCount} items (available)
        </p>
      </div>

      <div className="my-4 space-y-2 text-sm text-dark-light">
        <div className="flex justify-between items-center">
          <p>Subtotal</p>
          <p>${availableItemsTotal}</p>
        </div>
        <div className="flex justify-between items-center">
          <p>Shipping Charges</p>
          <p>Free</p>
        </div>
      </div>

      <div className="pt-3 border-t flex justify-between items-center">
        <p className="">Total</p>
        <p className="text-end">${availableItemsTotal}</p>
      </div>

      <CheckoutButton disabled={notAvailableCount !== 0} />

      {notAvailableCount !== 0 && (
        <div className="mt-2 text-dark-light/80 flex gap-1 justify-center text-center">
          <LuLock size={14} className="shrink-0 mt-px" />

          <p className="text-xs w-max">
            Remove or save unavailable items to continue.
          </p>
        </div>
      )}
    </div>
  );
};

export default CartSummary;
