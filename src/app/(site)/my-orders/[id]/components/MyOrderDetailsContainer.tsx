interface MyOrderDetailsContainerProps {
  children: React.ReactNode;
}

const MyOrderDetailsContainer = ({
  children,
}: MyOrderDetailsContainerProps) => {
  return (
    <div className="ui-container mb-12 mt-8">
      <h2 className="mb-8 text-2xl font-semibold text-center">Order Details</h2>

      <div className="grid lg:grid-cols-[1fr_320px] gap-8">{children}</div>
    </div>
  );
};

export default MyOrderDetailsContainer;
