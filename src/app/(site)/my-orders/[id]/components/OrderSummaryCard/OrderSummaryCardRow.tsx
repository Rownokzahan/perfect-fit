import clsx from "clsx";

interface OrderSummaryCardRowProps {
  label: string;
    value: string | number;
    className?:string
};

const OrderSummaryCardRow = ({
  label,
  value,
  className,
}: OrderSummaryCardRowProps) => {
  return (
    <div
      className={clsx(
        "flex justify-between items-center text-dark-light",
        className
      )}
    >
      <p className="font-medium">{label}</p>
      <p className="text-xs">{value}</p>
    </div>
  );
};

export default OrderSummaryCardRow;
