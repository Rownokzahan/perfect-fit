"use client";

import { moveToWishlist } from "@/actions/cart/mutations/moveToWishlist";
import { Id } from "@/types";
import clsx from "clsx";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { FaRegHeart } from "react-icons/fa";
import { LuLoader } from "react-icons/lu";

interface MoveToWishlistButtonProps {
  cartItemId: Id;
  productId: Id;
}

const MoveToWishlistButton = ({
  cartItemId,
  productId,
}: MoveToWishlistButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleMoveToWishlist = () => {
    if (isPending) {
      return;
    }

    startTransition(async () => {
      const error = await moveToWishlist({ cartItemId, productId });

      if (error) {
        toast.error(error.message, { duration: 5000 });
      }
    });
  };

  return (
    <button
      onClick={handleMoveToWishlist}
      disabled={isPending}
      aria-label="Move item to wishlist"
      className={clsx(
        "sm:w-max sm:px-3 size-8 rounded-full border flex items-center justify-center",
        "text-dark-light",
        !isPending && "hover:text-primary hover:border-primary duration-100",
      )}
    >
      {isPending ? <LuLoader className="animate-spin" /> : <FaRegHeart />}

      <span className="hidden sm:inline-block text-xs ms-2">
        Move to Wislist
      </span>
    </button>
  );
};

export default MoveToWishlistButton;
