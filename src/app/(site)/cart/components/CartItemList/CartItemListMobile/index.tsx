import CartItemMobile from "./CartItemMobile";
import { CartItemType } from "@/types/cart";

interface CartItemListMobileProps {
  cartItems: CartItemType[];
}

const CartItemListMobile = ({ cartItems }: CartItemListMobileProps) => {
  return (
    <div className="sm:hidden space-y-2">
      {cartItems.map((cartItem, index) => (
        <CartItemMobile key={index} cartItem={cartItem} />
      ))}
    </div>
  );
};

export default CartItemListMobile;
