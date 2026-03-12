"use client";

import {
  CartAction,
  updateCartItemQuantity,
} from "@/actions/cart/mutations/updateCartItemQuantity";
import { Id } from "@/types";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import { LiaSpinnerSolid } from "react-icons/lia";

interface CartItemQuantityProps {
  cartItemId: Id;
  quantity: number;
  stock: number;
}

const CartItemQuantity = ({
  cartItemId,
  quantity,
  stock,
}: CartItemQuantityProps) => {
  const [isPending, startTransition] = useTransition();

  const handleUpdateQuantity = (action: CartAction) => {
    if (isPending) {
      return;
    }

    startTransition(async () => {
      const error = await updateCartItemQuantity(cartItemId, action);

      if (error) {
        toast.error(error.message, { duration: 5000 });
      }
    });
  };

  if (isPending) {
    return (
      <div className="h-7 w-21 rounded-full bg-gray-200 text-dark-light animate-pulse grid place-content-center">
        <LiaSpinnerSolid className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-21 flex items-center justify-between gap-2">
      <button
        onClick={() => handleUpdateQuantity("decrease")}
        aria-label="Decrease quantity"
        disabled={quantity < 2}
        className="shrink-0 size-7 border rounded-full bg-light-light grid place-items-center disabled:opacity-40"
      >
        <HiOutlineMinus size={14} />
      </button>

      <p className="text-dark-light">{quantity}</p>

      <button
        onClick={() => handleUpdateQuantity("increase")}
        aria-label="Increase quantity"
        disabled={stock === quantity}
        className="shrink-0 size-7 border rounded-full bg-light-light grid place-items-center disabled:opacity-40"
      >
        <HiOutlinePlus size={14} />
      </button>
    </div>
  );
};

export default CartItemQuantity;
