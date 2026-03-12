import ClearCartButton from "./ClearCartButton";

interface CartHeaderProps {
  cartItemsCount: number;
  notAvailableCount: number;
}

const CartHeader = ({ cartItemsCount, notAvailableCount }: CartHeaderProps) => {
  return (
    <div className="mt-6 flex justify-between gap-6">
      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl">Your Shopping Bag</h2>
        <p className="text-sm">
          <span className="text-dark-light/80">
            {cartItemsCount === 1 ? "1 item" : `${cartItemsCount} items`}.
          </span>

          {notAvailableCount > 0 && (
            <span className="ms-1 text-warning">
              {notAvailableCount} needs you attention.
            </span>
          )}
        </p>
      </div>

      <ClearCartButton />
    </div>
  );
};

export default CartHeader;
