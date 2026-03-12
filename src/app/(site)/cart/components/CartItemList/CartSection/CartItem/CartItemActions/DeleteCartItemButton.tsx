"use client";

import { removeFromCart } from "@/actions/cart/mutations/removeFromCart";
import { Id } from "@/types";
import clsx from "clsx";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { LuLoader, LuTrash2 } from "react-icons/lu";

interface DeleteCartItemButtonProps {
  cartItemId: Id;
}

const DeleteCartItemButton = ({ cartItemId }: DeleteCartItemButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleRemove = () => {
    if (isPending) {
      return;
    }

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
      className={clsx(
        "sm:w-max sm:px-3 size-8 rounded-full border flex items-center justify-center",
        "text-dark-light",
        !isPending && "hover:text-danger hover:border-danger duration-100",
      )}
    >
      {isPending ? <LuLoader className="animate-spin" /> : <LuTrash2 />}

      <span className="hidden sm:inline-block text-xs ms-2">
        Remove
      </span>
    </button>
  );
};

export default DeleteCartItemButton;
