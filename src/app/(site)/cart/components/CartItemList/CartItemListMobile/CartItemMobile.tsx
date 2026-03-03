import CartItemImage from "../shared/CartItemImage";
import CartItemQuantity from "../shared/CartItemQuantity";
import CustomizedProductInfo from "@/components/ui/CustomizedProductInfo";
import { CartItemType } from "@/types/cart";
import DeleteCartItemButton from "../shared/DeleteCartItemButton";
import MoveToWishlistButton from "../shared/MoveToWishlistButton";

interface CartItemMobileProps {
  cartItem: CartItemType;
}

const CartItemMobile = ({ cartItem }: CartItemMobileProps) => {
  const { _id, totalPrice, quantity, isCustomDress } = cartItem;

  return (
    <div className="rounded bg-light-light">
      <div className="p-4 grid grid-cols-[1.8fr_2fr] gap-4">
        <CartItemImage cartItem={cartItem} />

        <div className="w-full min-w-0 flex flex-col justify-between space-y-2">
          <CustomizedProductInfo customizedProduct={cartItem} />

          <div className="flex flex-wrap gap-2 items-center justify-between">
            <h3 className="font-medium">${totalPrice}</h3>
            <CartItemQuantity cartItemId={_id} quantity={quantity} />
          </div>
        </div>
      </div>

      <div className="h-10 border-t grid grid-cols-2 divide-x">
        {isCustomDress ? (
          <MoveToWishlistButton isCustomDress={true} />
        ) : (
          <MoveToWishlistButton
            cartItemId={_id}
            isCustomDress={false}
            productId={cartItem.product._id}
          />
        )}

        <DeleteCartItemButton cartItemId={_id} />
      </div>
    </div>
  );
};

export default CartItemMobile;
