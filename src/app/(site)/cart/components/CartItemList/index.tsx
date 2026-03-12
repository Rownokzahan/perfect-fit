import { CartItemType } from "@/types/cart";
import CartSection from "./CartSection";

interface CartItemListProps {
  availableItems: CartItemType[];
  unavailableItems: CartItemType[];
}

const CartItemList = ({
  availableItems,
  unavailableItems,
}: CartItemListProps) => {
  return (
    <div className="space-y-12">
      <CartSection isAvilablelist={false} items={unavailableItems} />
      <CartSection isAvilablelist={true} items={availableItems} />
    </div>
  );
};

export default CartItemList;
