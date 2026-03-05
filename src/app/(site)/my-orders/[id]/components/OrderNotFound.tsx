import { TbSearch } from "react-icons/tb";

const OrderNotFound = () => {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="ui-container text-center text-dark-light">
        <TbSearch className="mx-auto text-4xl" />
        <h3 className="mt-3 font-medium text-lg">No Order Found</h3>
      </div>
    </div>
  );
};

export default OrderNotFound;
