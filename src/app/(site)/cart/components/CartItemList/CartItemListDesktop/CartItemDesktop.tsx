import CartItemQuantity from "../shared/CartItemQuantity";
import { CartItemType } from "@/types/cart";
import CustomizedProductInfo from "@/components/ui/CustomizedProductInfo";
import DeleteCartItemButton from "../shared/DeleteCartItemButton";
import CustomizedProductPreview from "@/components/ui/CustomizedProductPreview";

interface CartItemDesktopProps {
  cartItem: CartItemType;
}

const CartItemDesktop = ({ cartItem }: CartItemDesktopProps) => {
  const { _id, name, customizations, subtotal, quantity,stock } = cartItem || {};

  return (
    <div className="py-6 grid grid-cols-1 sm:grid-cols-[2fr_2fr_1fr_1fr_1fr] gap-6">
      <CustomizedProductPreview item={cartItem} />
      <CustomizedProductInfo customizations={customizations} name={name} />
      <CartItemQuantity cartItemId={_id} quantity={quantity} stock={stock} />

      {/* Price */}
      <p className="font-medium self-center text-end">${subtotal}</p>

      <DeleteCartItemButton cartItemId={_id} showText={false} />
    </div>
  );
};

export default CartItemDesktop;
