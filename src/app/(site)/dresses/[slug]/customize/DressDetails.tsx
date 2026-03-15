import WishlistButton from "@/components/cards/ProductCard/WishlistButton";
import OutOfStockOverlay from "@/components/ui/OutOfStockOverlay";
import { Product } from "@/types/product";
import Image from "next/image";

interface DressDetailsProps {
  dress: Product;
  isWishlisted: boolean;
}

const DressDetails = ({ dress, isWishlisted }: DressDetailsProps) => {
  const { _id, image, name, price, stock } = dress;

  return (
    <div className="w-full sm:w-8/12 mx-auto lg:w-full lg:h-[calc(100dvh-170px)] lg:sticky lg:top-12 lg:left-0">
      <figure className="w-full aspect-5/6 lg:h-[calc(100%-36px)] lg:aspect-auto rounded relative overflow-hidden">
        <Image
          width={600}
          height={800}
          src={image}
          alt="Product Image"
          className="size-full object-cover"
          unoptimized
        />

        {stock === 0 && <OutOfStockOverlay />}

        <WishlistButton productId={_id} isWishlisted={isWishlisted} />
      </figure>

      <div className="pt-2 flex items-start justify-between gap-4">
        <p className="text-dark-light">{name}</p>
        <h3 className="text-lg">${price}</h3>
      </div>
    </div>
  );
};

export default DressDetails;
