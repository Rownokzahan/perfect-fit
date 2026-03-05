import CustomDressPreview from "@/components/ui/CustomDressPreview";
import { CartItemType } from "@/types/cart";
import clsx from "clsx";
import Image from "next/image";

interface OrderCardImageProps {
  orderItems: CartItemType[];
}

const OrderCardImage = ({ orderItems }: OrderCardImageProps) => {
  const firstItem = orderItems[0]?.customizedProduct || {};
  const { bodiceType, sleeveType, skirtType } = firstItem;

  const remainingCount = orderItems.length - 1;

  return (
    <div className="w-20 aspect-8/11 rounded bg-gray-100 relative">
      {firstItem.productType === "customDress" ? (
        <CustomDressPreview
          bodice={bodiceType}
          sleeve={sleeveType}
          skirt={skirtType}
        />
      ) : (
        <figure className="size-full">
          <Image
            src={firstItem?.product?.imageSnapshot || "/placeholder.jpg"}
            alt="Product Image"
            width={400}
            height={700}
            className="size-full rounded object-cover object-top bg-gray-200"
            unoptimized
          />
        </figure>
      )}

      {remainingCount > 0 && (
        <div
          className={clsx(
            "size-5 rounded bg-dark/30 text-sm text-light",
            "absolute bottom-1 right-1 grid place-items-center",
          )}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

export default OrderCardImage;
