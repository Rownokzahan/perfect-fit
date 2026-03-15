import Button from "@/components/ui/Button";
import { CartItemType } from "@/types/cart";
import Link from "next/link";

interface YourCartProps {
  cartItems: CartItemType[];
}

const YourCart = ({ cartItems }: YourCartProps) => {
  const cartTotal = cartItems.reduce((total, item) => total + item.subtotal, 0);

  return (
    <div className="h-max p-4 sm:p-6 rounded bg-light-light">
      <div className="flex justify-between items-center">
        <h3 className="sm:text-lg">Your Cart</h3>

        <Link
          href="/cart"
          className="hover:underline text-sm text-dark-light hover:text-primary duration-300"
        >
          Edit
        </Link>
      </div>

      <div className="my-4 space-y-2 text-sm text-dark-light">
        <div className="flex justify-between items-center">
          <p>{cartItems.length} items</p>
          <p>${cartTotal}</p>
        </div>
        <div className="flex justify-between items-center">
          <p>Subtotal</p>
          <p>${cartTotal}</p>
        </div>
        <div className="flex justify-between items-center">
          <p>Shipping Charges</p>
          <p>$0</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="">Total</p>
        <p className="text-end">${cartTotal}</p>
      </div>

      <div className="mt-6">
        <Button type="submit" form="place-order-form" className="w-full">
          Place Order
        </Button>
      </div>
    </div>
  );
};

export default YourCart;

