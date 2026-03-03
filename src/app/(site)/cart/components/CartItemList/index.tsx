import { CartItemType } from "@/types/cart";
import CartItemListDesktop from "./CartItemListDesktop";
import CartItemListMobile from "./CartItemListMobile";

interface CartItemListProps {
  cartItems:CartItemType[];
}

const CartItemList = ({ cartItems }: CartItemListProps) => {
  return (
    <>
      <CartItemListDesktop cartItems={cartItems} />
      <CartItemListMobile cartItems={cartItems} />
    </>
  );
};

export default CartItemList;
