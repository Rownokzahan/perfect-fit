import Image from "next/image";
import Link from "next/link";
import { TbEdit } from "react-icons/tb";
import DeleteProductButton from "./DeleteProductButton";
import { Product } from "@/types/product";
import StatusToggleButton from "./StatusToggleButton";
import RestoreProductButton from "./RestoreProductButton";

interface AdminProductTableRowProps {
  product: Product;
}

const AdminProductTableRow = ({ product }: AdminProductTableRowProps) => {
  const { _id, image, name, price, stock, status } = product || {};

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-3">
        <div className="size-16 relative">
          <Image
            src={image}
            alt={name}
            className="size-full rounded-md object-cover bg-gray-200"
            fill
            unoptimized
          />
        </div>
      </td>
      <td className="px-4 py-3 font-medium text-dark/65">{name}</td>
      <td className="px-4 py-3 font-medium text-dark/65">{stock}</td>
      <td className="px-4 py-3 font-semibold">${price}</td>

      <td className="px-4 py-3">
        {status === "archived" ? (
          <span className="px-2 py-1 text-xs font-medium rounded bg-gray-200 text-gray-600">
            Archived
          </span>
        ) : (
          <StatusToggleButton status={status} productId={_id} />
        )}
      </td>

      <td className="px-4 py-3">
        <div className="flex items-center justify-center gap-2 text-lg text-dark-light">
          {status === "archived" ? (
            <RestoreProductButton productId={_id} />
          ) : (
            <>
              <Link
                href={`/admin/products/edit/${_id}`}
                className="size-6 grid place-items-center"
                title="Edit Product"
              >
                <TbEdit />
              </Link>

              <DeleteProductButton productId={_id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default AdminProductTableRow;
