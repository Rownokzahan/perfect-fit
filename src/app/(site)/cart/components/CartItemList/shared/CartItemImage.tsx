import CustomizedProductPreview from "@/components/ui/CustomizedProductPreview";
import { CartItemType } from "@/types/cart";

interface CartItemImageProps {
  cartItem: CartItemType;
}

const CartItemImage = ({ cartItem }: CartItemImageProps) => {
  const {
    customizations: { bodiceType, sleeveType, skirtType },
    isCustomDress,
  } = cartItem || {};

  let productImage = undefined;

  if (!isCustomDress && "product" in cartItem) {
    productImage = cartItem.product.imageSnapshot;
  }

  return (
    <CustomizedProductPreview
      isCustomDress={isCustomDress}
      productImage={productImage}
      bodice={bodiceType}
      sleeve={sleeveType}
      skirt={skirtType}
    />
  );
};

export default CartItemImage;
