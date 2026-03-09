import Image from "next/image";
import CustomDressPreview from "./CustomDressPreview";
import Link from "next/link";
import { CartItemType } from "@/types/cart";

interface CustomizedProductPreviewProps {
  item: CartItemType;
}

const CustomizedProductPreview = ({ item }: CustomizedProductPreviewProps) => {
  const { customizations, productType } = item;
  if (productType === "customDress") {
    const { bodiceType, sleeveType, skirtType } = customizations;

    return (
      <Link href={"/custom-dress"} className="block size-full">
        <CustomDressPreview
          bodice={bodiceType || ""}
          sleeve={sleeveType || ""}
          skirt={skirtType || ""}
        />
      </Link>
    );
  }

  const { slugSnapshot, imageSnapshot } = item.product;

  return (
    <Link
      href={`/dresses/${slugSnapshot}/customize`}
      className="block size-full"
    >
      <Image
        src={imageSnapshot || "/placeholder.jpg"}
        alt="Product Image"
        width={400}
        height={700}
        className="size-full rounded object-cover object-top bg-gray-200"
        unoptimized
      />
    </Link>
  );
};

export default CustomizedProductPreview;
