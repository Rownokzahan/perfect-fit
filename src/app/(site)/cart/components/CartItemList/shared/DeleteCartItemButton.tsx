"use client";

import { removeFromCart } from "@/actions/cart/mutations/removeFromCart";
import { Id } from "@/types";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { LuLoader, LuTrash2 } from "react-icons/lu";

interface DeleteCartItemButtonProps {
  cartItemId: Id;
  showText?: boolean;
}

const DeleteCartItemButton = ({
  cartItemId,
  showText = true,
}: DeleteCartItemButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleRemove = () => {
    startTransition(async () => {
      const error = await removeFromCart(cartItemId);

      if (error) {
        toast.error(error.message, { duration: 5000 });
      }
    });
  };

  return (
    <button
      onClick={handleRemove}
      disabled={isPending}
      aria-label="Remove item from cart"
      className="flex items-center justify-center text-dark-light disabled:opacity-60"
    >
      {isPending ? <LuLoader className="animate-spin" /> : <LuTrash2 />}

      {showText && (
        <span className="ms-2 text-xs font-semibold">
          {isPending ? "Removing" : "Remove"}
        </span>
      )}
    </button>
  );
};

export default DeleteCartItemButton;
