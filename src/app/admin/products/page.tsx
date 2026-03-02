import { getProducts } from "@/actions/products/queries/getProducts";
import ProductsPageHeader from "./components/ProductsPageHeader";
import ProductTableSkeleton from "./components/ProductTable/ProductTableSkeleton";
import { Suspense } from "react";
import ProductTable from "./components/ProductTable";
import ProductFilters from "@/components/ui/ProductFilters";
import { isProductStatus } from "@/types/product";

export const metadata = {
  title: "Manage Product - Admin",
};

interface Params {
  searchParams: Promise<{
    search?: string;
    page?: string;
    category?: string;
    sort?: string;
    status?: string;
  }>;
}

const AdminProductsPage = async ({ searchParams }: Params) => {
  const { search, page, category, sort, status } = await searchParams;
  const productsPromise = getProducts({
    search,
    page,
    category,
    sort,
    status:
      typeof status === "string" && isProductStatus(status)
        ? status
        : undefined,
    limit: 6,
  });

  return (
    <>
      <ProductsPageHeader />
      <ProductFilters />

      <Suspense fallback={<ProductTableSkeleton />}>
        <ProductTable productsPromise={productsPromise} />
      </Suspense>
    </>
  );
};

export default AdminProductsPage;
