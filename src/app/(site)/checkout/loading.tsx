import CheckoutContainer from "./components/CheckoutContainer";
import DeliveryInfoFormSkeleton from "./components/DeliveryInfoForm/DeliveryInfoFormSkeleton";
import YourCartSkeleton from "./components/YourCart/YourCartSkeleton";

const CheckoutLoadingPage = () => {
  return (
    <CheckoutContainer>
      <DeliveryInfoFormSkeleton />
      <YourCartSkeleton />
    </CheckoutContainer>
  );
};

export default CheckoutLoadingPage;
