import { getCartItems } from "@/actions/cart/queries/getCartItems";
import NoCartItemFound from "./components/NoCartItemFound";
import CartSummary from "./components/CartSummary";
import CartItemList from "./components/CartItemList";
import { CartItemType } from "@/types/cart";
import CartHeader from "./components/CartHeader";

export const metadata = {
  title: "Your Shopping Bag",
};

const CartPage = async () => {
  const cartItems = await getCartItems();

  if (cartItems.length === 0) {
    return <NoCartItemFound />;
  }

  const availableItems: CartItemType[] = [];
  const unavailableItems: CartItemType[] = [];

  for (const item of cartItems) {
    if (item.availability === "available") {
      availableItems.push(item);
    } else {
      unavailableItems.push(item);
    }
  }

  // total price of items that can be purchased
  const availableItemsTotal = availableItems.reduce(
    (total, item) => total + item.subtotal,
    0,
  );

  const availableCount = availableItems.length;

  // items that cannot be purchased right now
  const notAvailableCount = unavailableItems.length;

  return (
    <div className="ui-container">
      <CartHeader
        cartItemsCount={cartItems.length}
        notAvailableCount={notAvailableCount}
      />

      <div className="my-8 grid grid-cols-1 lg:grid-cols-[60%_1fr] gap-8">
        <CartItemList
          availableItems={availableItems}
          unavailableItems={unavailableItems}
        />

        <CartSummary
          availableItemsTotal={availableItemsTotal}
          availableCount={availableCount}
          notAvailableCount={notAvailableCount}
        />
      </div>
    </div>
  );
};

export default CartPage;
