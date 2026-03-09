"use client";

import {
  CartAction,
  updateCartItemQuantity,
} from "@/actions/cart/mutations/updateCartItemQuantity";
import { Id } from "@/types";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";

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
    startTransition(async () => {
      const error = await updateCartItemQuantity(cartItemId, action);

      if (error) {
        toast.error(error.message, { duration: 5000 });
      }
    });
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 place-items-center">
        <button
          onClick={() => handleUpdateQuantity("decrease")}
          aria-label="Decrease quantity"
          disabled={isPending || quantity === 1}
          className="size-6 border rounded grid place-items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <HiOutlineMinus className="text-xs" />
        </button>

        <p className="font-medium text-sm">{isPending ? "..." : quantity}</p>

        <button
          onClick={() => handleUpdateQuantity("increase")}
          aria-label="Increase quantity"
          disabled={isPending || stock === quantity}
          className="size-6 border rounded grid place-items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <HiOutlinePlus className="text-xs" />
        </button>
      </div>
    </div>
  );
};

export default CartItemQuantity;
