interface CheckoutContainerProps {
  children: React.ReactNode;
}

const CheckoutContainer = ({ children }: CheckoutContainerProps) => {
  return (
    <div className="ui-container mt-8 mb-12">
      <h2 className="mb-8 text-2xl text-center">Checkout</h2>

      <div className="grid grid-cols-1 lg:grid-cols-[60%_1fr] gap-8">
        {children}
      </div>
    </div>
  );
};

export default CheckoutContainer;

