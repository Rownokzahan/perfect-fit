import { CartItemType } from "@/types/cart";
import CartItem from "./CartItem";

interface CartSectionProps {
  isAvilablelist: boolean;
  items: CartItemType[];
}

const CartSection = ({ isAvilablelist, items }: CartSectionProps) => {
  if (items.length === 0) {
    return null;
  }

  const title = isAvilablelist ? "Available" : "Unavailable";

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xs text-dark-light/85 tracking-wider">{title}</h3>

        <div className="flex-1 w-full h-px bg-dark-light/50"/>

        <div className="size-4 rounded-full bg-dark-light/10 flex items-center justify-center text-dark-light text-xs">
          {items.length}
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <CartItem key={item._id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default CartSection;
