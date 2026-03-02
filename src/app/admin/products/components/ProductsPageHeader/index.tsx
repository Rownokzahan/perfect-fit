import Button from "@/components/ui/Button";
import ProductsTabs from "./ProductsTabs";

const ProductsPageHeader = () => {
  return (
    <div className="mb-6 flex gap-4 justify-between">
      <ProductsTabs />

      <Button href={"/admin/products/add"} className="hidden md:block">Add Product</Button>
    </div>
  );
};

export default ProductsPageHeader;
