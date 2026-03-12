import CartHeaderSkeleton from "./components/CartHeader/CartHeaderSkeleton";
import CartItemListSkeleton from "./components/CartItemList/CartItemListSkeleton";
import CartSummarySkeleton from "./components/CartSummary/CartSummarySkeleton";

const CartLoadingPage = () => {
  return (
    <div className="ui-container">
      <CartHeaderSkeleton />

      <div className="my-8 grid grid-cols-1 lg:grid-cols-[60%_1fr] gap-8">
        <CartItemListSkeleton />
        <CartSummarySkeleton />
      </div>
    </div>
  );
};

export default CartLoadingPage;
