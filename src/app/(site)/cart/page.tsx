import { getCartItems } from "@/actions/cart/queries/getCartItems";
import NoCartItemFound from "./components/NoCartItemFound";
import ClearCartButton from "./components/ClearCartButton";
import CartSummary from "./components/CartSummary";
import CartItemList from "./components/CartItemList";

export const metadata = {
  title: "Your Shopping Bag",
};

const CartPage = async () => {
  const cartItems = await getCartItems();

  if (cartItems.length === 0) {
    return <NoCartItemFound />;
  }

  const cartTotal = cartItems.reduce((total, item) => total + item.subtotal, 0);

  return (
    <div className="ui-container mb-12 mt-5 sm:mt-12 grid grid-cols-1 lg:grid-cols-[60%_1fr] gap-8">
      <div className="space-y-4">
        <div className="p-4 sm:px-6 rounded bg-light-light flex justify-between items-start gap-3">
          <h3 className="flex items-center flex-wrap">
            <span className="me-1 font-semibold">Your Shopping Bag</span>
            <span className="text-dark-light text-sm">
              ({cartItems.length} items)
            </span>
          </h3>

          <ClearCartButton />
        </div>

        <CartItemList cartItems={cartItems} />
      </div>

      <CartSummary cartItemsCount={cartItems.length} cartTotal={cartTotal} />
    </div>
  );
};

export default CartPage;
