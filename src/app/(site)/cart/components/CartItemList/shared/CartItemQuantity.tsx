"use client";

import { Id } from "@/types";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";

interface CartItemQuantityProps {
  cartItemId: Id;
  quantity: number;
}

const CartItemQuantity = ({ cartItemId, quantity }: CartItemQuantityProps) => {
  const decreaseCartItemQuantity = (cartItemId: Id) => {
    console.log(cartItemId);
  };
  const increaseCartItemQuantity = (cartItemId: Id) => {
    console.log(cartItemId);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 place-items-center">
        <button
          onClick={() => decreaseCartItemQuantity(cartItemId)}
          aria-label="Decrease quantity"
          className="size-6 border rounded grid place-items-center"
        >
          <HiOutlineMinus className="text-xs" />
        </button>

        <p className="font-medium text-sm">{quantity}</p>

        <button
          onClick={() => increaseCartItemQuantity(cartItemId)}
          aria-label="Increase quantity"
          className="size-6 border rounded grid place-items-center"
        >
          <HiOutlinePlus className="text-xs" />
        </button>
      </div>
    </div>
  );
};

export default CartItemQuantity;
