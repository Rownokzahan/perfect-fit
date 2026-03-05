interface DeliveryInfoCardProps {
  deliveryInfo: {
    name: string;
    email: string;
    phoneNumber: string;
    deliveryAddress: string;
  };
}

const DeliveryInfoCard = ({ deliveryInfo }: DeliveryInfoCardProps) => {
  const { name, email, phoneNumber, deliveryAddress } = deliveryInfo || {};

  return (
    <div className="p-4 sm:p-6 rounded bg-light-light">
      <h3 className="font-semibold sm:text-lg">Delivery Information</h3>

      <div className="mt-2 text-sm text-dark-light space-y-1">
        <p>
          <span className="font-medium">Name: </span>
          {name}
        </p>
        <p>
          <span className="font-medium">Email: </span>
          {email}
        </p>
        <p>
          <span className="font-medium">Phone: </span>
          {phoneNumber}
        </p>
        <p>
          <span className="font-medium">Address: </span>
          {deliveryAddress}
        </p>
      </div>
    </div>
  );
};

export default DeliveryInfoCard;
