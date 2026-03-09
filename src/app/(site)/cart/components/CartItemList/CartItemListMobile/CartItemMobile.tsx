import CartItemQuantity from "../shared/CartItemQuantity";
import CustomizedProductInfo from "@/components/ui/CustomizedProductInfo";
import { CartItemType } from "@/types/cart";
import DeleteCartItemButton from "../shared/DeleteCartItemButton";
import MoveToWishlistButton from "../shared/MoveToWishlistButton";
import CustomizedProductPreview from "@/components/ui/CustomizedProductPreview";

interface CartItemMobileProps {
  cartItem: CartItemType;
}

const CartItemMobile = ({ cartItem }: CartItemMobileProps) => {
  const { _id, name, customizations, subtotal, quantity, stock } =
    cartItem || {};

  return (
    <div className="rounded bg-light-light">
      <div className="p-4 grid grid-cols-[1.8fr_2fr] gap-4">
        <CustomizedProductPreview item={cartItem} />

        <div className="w-full min-w-0 flex flex-col justify-between space-y-2">
          <CustomizedProductInfo customizations={customizations} name={name} />

          <div className="flex flex-wrap gap-2 items-center justify-between">
            <h3 className="font-medium">${subtotal}</h3>
            <CartItemQuantity
              cartItemId={_id}
              quantity={quantity}
              stock={stock}
            />
          </div>
        </div>
      </div>

      <div className="h-10 border-t grid grid-cols-2 divide-x">
        {cartItem.productType === "customDress" ? (
          <MoveToWishlistButton isCustomDress={true} />
        ) : (
          <MoveToWishlistButton
            cartItemId={_id}
            isCustomDress={false}
            productId={cartItem.product.productId}
          />
        )}

        <DeleteCartItemButton cartItemId={_id} />
      </div>
    </div>
  );
};

export default CartItemMobile;
