import Button from "@/components/ui/Button";
import { TbShoppingBag } from "react-icons/tb";

const NoOrderFound = () => {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="ui-container text-center">
        <TbShoppingBag className="mx-auto text-6xl" />

        <h3 className="mt-4 font-semibold text-xl">
          Your currently have no orders
        </h3>

        <p className="mt-3 text-dark-light">
          Looks like you haven&apos;t placed any order yet.
        </p>

        <Button href="/dresses" className="w-max mx-auto mt-6">
          Go Shopping
        </Button>
      </div>
    </div>
  );
};

export default NoOrderFound;
