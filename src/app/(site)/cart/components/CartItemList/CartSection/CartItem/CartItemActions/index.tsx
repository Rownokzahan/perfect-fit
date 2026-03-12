import { CartItemAvailability, CartItemType } from "@/types/cart";
import CartItemQuantity from "./CartItemQuantity";
import MoveToWishlistButton from "./MoveToWishlistButton";
import DeleteCartItemButton from "./DeleteCartItemButton";

interface Props {
  item: CartItemType;
  availability:CartItemAvailability;
}

const CartItemActions = ({ item }: Props) => {
  const { _id, quantity, stock } = item;

  return (
    <div className="pt-3 mt-3 border-t flex justify-between">
      {item.availability === "available" && (
        <CartItemQuantity cartItemId={_id} quantity={quantity} stock={stock} />
      )}

      <div className="flex items-center gap-3">
        {item.productType === "product" &&
          item.availability !== "unavailable" && (
            <MoveToWishlistButton
              productId={item.product.productId}
              cartItemId={_id}
            />
          )}

        <DeleteCartItemButton cartItemId={_id} />
      </div>
    </div>
  );
};

export default CartItemActions;
