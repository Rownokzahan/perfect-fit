"use client";

import { useTransition } from "react";
import clsx from "clsx";
import { Id } from "@/types";
import { ProductStatus } from "@/types/product";
import { updateProductStatus } from "@/actions/products/mutations/updateProductStatus";
import toast from "react-hot-toast";

interface StatusToggleButtonProps {
  status: ProductStatus;
  productId: Id;
}

const StatusToggleButton = ({ status, productId }: StatusToggleButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const isActive = status === "active";

  const handleToggle = async () => {
    const newStatus: ProductStatus = isActive ? "inactive" : "active";

    startTransition(async () => {
      const error = await updateProductStatus(productId, newStatus);
      if (error) {
        toast.error(error.message);
      }
    });
  };

  console.log({ isActive, isPending });

  return (
    <div
      onClick={handleToggle}
      className={clsx(
        "relative w-10 h-5 flex items-center rounded-full cursor-pointer transition-all duration-300",
        isPending ? "opacity-50 cursor-not-allowed" : "hover:scale-105",
        isActive
          ? "bg-linear-to-r from-green-400 to-emerald-400"
          : "bg-linear-to-r from-gray-200 to-gray-300",
      )}
      style={{
        boxShadow: isActive
          ? "inset 0 2px 4px rgba(0, 0, 0, 0.1)"
          : "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        className={clsx(
          "absolute top-0.5 left-0.5 size-4 bg-white rounded-full transition-transform duration-300",
          isActive ? "translate-x-5" : "translate-x-0",
          isPending && "animate-pulse",
        )}
      />
    </div>
  );
};

export default StatusToggleButton;
