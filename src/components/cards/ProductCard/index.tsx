import { Product } from "@/types/product";
import Image from "next/image";
import WishlistButton from "./WishlistButton";
import Link from "next/link";
import { getWishlistedProductIds } from "@/actions/wishlist/queries/getWishlistedProductIds";
import OutOfStockOverlay from "@/components/ui/OutOfStockOverlay";

interface ProductCardProps {
  product: Product;
}

const ProductCard = async ({ product }: ProductCardProps) => {
  const { _id, slug, image, name, price, stock } = product || {};

  const wishlistIds = await getWishlistedProductIds();

  return (
    <article className="rounded-sm bg-light-light relative">
      <Link href={`/dresses/${slug}/customize`} className="block p-3">
        <figure className="aspect-5/6 rounded-t-sm relative overflow-hidden">
          <Image
            width={400}
            height={700}
            src={image}
            alt="Product Image"
            className="size-full object-cover object-top bg-gray-200"
            unoptimized
          />

          {stock === 0 && <OutOfStockOverlay />}
        </figure>

        <div className="mt-3 mx-1 space-y-1 text-sm">
          <p className="truncate">{name}</p>
          <p>${price}</p>
        </div>
      </Link>

      <WishlistButton
        productId={_id}
        isWishlisted={wishlistIds.includes(product._id)}
      />
    </article>
  );
};

export default ProductCard;
