import CheckoutButton from "./CheckoutButton";

interface CartSummaryProps {
  cartItemsCount: number;
  cartTotal: number;
}

const CartSummary = ({ cartItemsCount, cartTotal }: CartSummaryProps) => {
  return (
    <div className="h-max p-4 sm:p-6 rounded bg-light-light sticky top-16">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold sm:text-lg">Cart Summary</h3>
        <p className="text-dark-light text-sm">{cartItemsCount} items</p>
      </div>

      <div className="my-4 space-y-2 text-sm text-dark-light">
        <div className="flex justify-between items-center">
          <p>Subtotal</p>
          <p>${cartTotal}</p>
        </div>
        <div className="flex justify-between items-center">
          <p>Shipping Charges</p>
          <p>$0</p>
        </div>
      </div>

      <div className="mb-6 pt-3 border-t flex justify-between items-center">
        <p className="font-semibold">Total</p>
        <p className="font-medium text-end">${cartTotal}</p>
      </div>

      <CheckoutButton />
    </div>
  );
};

export default CartSummary;
