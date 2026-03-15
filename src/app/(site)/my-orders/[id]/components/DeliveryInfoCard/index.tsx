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
      <h3 className="sm:text-lg">Delivery Information</h3>

      <div className="mt-2 text-sm text-dark-light space-y-1">
        <p>
          <span className="">Name: </span>
          {name}
        </p>
        <p>
          <span className="">Email: </span>
          {email}
        </p>
        <p>
          <span className="">Phone: </span>
          {phoneNumber}
        </p>
        <p>
          <span className="">Address: </span>
          {deliveryAddress}
        </p>
      </div>
    </div>
  );
};

export default DeliveryInfoCard;

