"use client";

import { restoreProduct } from "@/actions/products/mutations/restoreProduct";
import { useConfirmActionModal } from "@/hooks/useConfirmActionModal";
import { Id } from "@/types";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { LuLoader, LuRotateCcw } from "react-icons/lu";

interface RestoreProductButtonProps {
  productId: Id;
}

const RestoreProductButton = ({ productId }: RestoreProductButtonProps) => {
  const confirmRestore = useConfirmActionModal();
  const [isPending, startTransition] = useTransition();

  const handleRestore = async () => {
    const confirmed = await confirmRestore({
      message: "Are you sure you want to restore this product?",
      action: "restore",
    });

    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      const error = await restoreProduct(productId);
      if (error) {
        toast.error(error.message);
      }
    });
  };

  return (
    <button
      onClick={handleRestore}
      className="size-6 grid place-items-center"
      title="Restore Product"
    >
      {isPending ? <LuLoader /> : <LuRotateCcw />}
    </button>
  );
};

export default RestoreProductButton;
