"use client";

import { moveToWishlist } from "@/actions/cart/mutations/moveToWishlist";
import { Id } from "@/types";
import clsx from "clsx";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { FaRegHeart } from "react-icons/fa";

type MoveToWishlistButtonProps =
  | {
      isCustomDress: true;
      cartItemId?: never;
      productId?: never;
    }
  | {
      isCustomDress: false;
      cartItemId: Id;
      productId: Id;
    };

const MoveToWishlistButton = ({
  isCustomDress,
  cartItemId,
  productId,
}: MoveToWishlistButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleMoveToWishlist = () => {
    if (isCustomDress) return;

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
      className={clsx(
        "text-dark-light font-semibold flex items-center justify-center",
        isCustomDress && "opacity-50 cursor-not-allowed",
      )}
    >
      <FaRegHeart />
      <span className="ms-2 text-xs font-semibold">
        {isPending ? "Moving..." : "Add To Wishlist"}
      </span>
    </button>
  );
};

export default MoveToWishlistButton;
