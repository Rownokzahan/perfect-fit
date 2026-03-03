import CartItemImage from "../shared/CartItemImage";
import CartItemQuantity from "../shared/CartItemQuantity";
import { CartItemType } from "@/types/cart";
import CustomizedProductInfo from "@/components/ui/CustomizedProductInfo";
import DeleteCartItemButton from "../shared/DeleteCartItemButton";

interface CartItemDesktopProps {
  cartItem: CartItemType;
}

const CartItemDesktop = ({ cartItem }: CartItemDesktopProps) => {
  const { _id, totalPrice, quantity } = cartItem;

  return (
    <div className="py-6 grid grid-cols-1 sm:grid-cols-[2fr_2fr_1fr_1fr_1fr] gap-6">
      <CartItemImage cartItem={cartItem} />
      <CustomizedProductInfo customizedProduct={cartItem} />
      <CartItemQuantity cartItemId={_id} quantity={quantity} />

      {/* Price */}
      <p className="font-medium self-center text-end">${totalPrice}</p>

      <DeleteCartItemButton cartItemId={_id} showText={false} />
    </div>
  );
};

export default CartItemDesktop;
