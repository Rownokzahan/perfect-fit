import { CartItemAvailability } from "@/types/cart";
import clsx from "clsx";

const AvailabilityBadge = ({
  availability,
}: {
  availability: CartItemAvailability;
}) => {
  if (availability === "available") {
    return null;
  }

  type BadgeAvailability = Exclude<CartItemAvailability, "available">;

  const config: Record<
    BadgeAvailability,
    {
      textColor: string;
      dotColor: string;
      label: string;
    }
  > = {
    out_of_stock: {
      textColor: "text-warning",
      dotColor: "bg-warning",
      label: "Out of stock",
    },
    unavailable: {
      textColor: "text-danger",
      dotColor: "bg-danger",
      label: "No longer exists",
    },
  };

  const status = config[availability];

  return (
    <div
      className={clsx(
        "w-max mt-3 px-3 py-1.5 rounded-full flex items-center gap-2 bg-light-light",
        status.textColor,
      )}
      role="status"
      aria-live="polite"
    >
      <span className={clsx("size-2 rounded-full", status.dotColor)} />
      <span className="text-xs font-medium">{status.label}</span>
    </div>
  );
};

export default AvailabilityBadge;
