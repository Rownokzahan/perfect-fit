import CustomizedProductPreview from "@/components/ui/CustomizedProductPreview";
import { CartItemType } from "@/types/cart";
import clsx from "clsx";
import { BsSlash } from "react-icons/bs";
import { TbChevronDown } from "react-icons/tb";

interface ItemInfoProps {
  item: CartItemType;
  showCustomizations: boolean;
  toggleCustomizations: () => void;
}

// Availability status badge component for better reusability
const AvailabilityBadge = ({
  availability,
}: {
  availability: CartItemType["availability"];
}) => {
  if (availability === "available") return null;

  const config = {
    out_of_stock: {
      textColor: "text-warning",
      dotColor: "bg-warning",
      label: "Out of stock",
    },
    no_longer_exists: {
      textColor: "text-danger",
      dotColor: "bg-danger",
      label: "No longer exists",
    },
  };

  const status = config[availability];
  if (!status) return null;

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

const ItemInfo = ({
  item,
  showCustomizations,
  toggleCustomizations,
}: ItemInfoProps) => {
  const { name, quantity, unitPrice, subtotal, availability } = item;
  const isAvailable = availability === "available";

  return (
    <div className="flex gap-4">
      {/* Product preview */}
      <div className="w-20 shrink-0 bg-gray-100 rounded overflow-hidden">
        <CustomizedProductPreview item={item} />
      </div>

      {/* Item details */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        {/* Header section with availability and name */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-semibold text-base leading-snug">{name}</h3>

            {isAvailable && (
              <span className="text-primary font-semibold shrink-0">
                ${subtotal}
              </span>
            )}
          </div>

          <AvailabilityBadge availability={availability} />

          {/* Price Display */}
          {isAvailable && (
            <div className="space-y-1 text-sm text-dark-light">
              <p className="flex items-center">
                <span className="font-medium">${unitPrice}</span>
                <span className="text-xs text-dark-light/70 flex items-center">
                  <BsSlash className="-rotate-20 size-4 -me-1" />
                  item
                </span>
              </p>
              <p className="text-xs">
                <span className="text-dark-light/70">Qty:</span>
                <span className="ms-1 font-medium">{quantity}</span>
              </p>
            </div>
          )}
        </div>

        {/* Customizations toggle button */}
        <button
          onClick={toggleCustomizations}
          aria-expanded={showCustomizations}
          aria-label={`${showCustomizations ? "Hide" : "View"} product customizations`}
          className="font-semibold text-dark-light/80 text-left text-sm hover:text-primary flex items-center gap-1"
        >
          <span>{showCustomizations ? "Hide" : "View"} customizations</span>
          <TbChevronDown
            className={clsx(
              "shrink-0 transition-transform duration-300",
              showCustomizations && "rotate-180",
            )}
            size={18}
          />
        </button>
      </div>
    </div>
  );
};

export default ItemInfo;
