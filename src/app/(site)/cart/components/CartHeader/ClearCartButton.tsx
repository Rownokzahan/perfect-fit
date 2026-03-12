"use client";

import { clearCart } from "@/actions/cart/mutations/clearCart";
import { useConfirmActionModal } from "@/hooks/useConfirmActionModal";
import { useTransition } from "react";
import toast from "react-hot-toast";

const ClearCartButton = () => {
  const confirmClearCart = useConfirmActionModal();
  const [isPending, startTransition] = useTransition();

  const handleClearCart = async () => {
    const confirmed = await confirmClearCart({
      message: "Are you sure you want to clear your shopping bag?",
      action: "clearCart",
    });

    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      const error = await clearCart();

      if (error) {
        toast.error(error.message, { duration: 5000 });
      }
    });
  };

  return (
    <button
      onClick={handleClearCart}
      disabled={isPending}
      className="h-max mt-1 uppercase text-xs text-primary font-medium underline underline-offset-2 text-nowrap disabled:opacity-50"
    >
      {isPending ? "Clearing..." : "Clear All"}
    </button>
  );
};

export default ClearCartButton;
