import DeliveryInfoCardSkeleton from "./components/DeliveryInfoCard/DeliveryInfoCardSkeleton";
import OrderIdCardSkeleton from "./components/OrderIdCard/OrderIdCardSkeleton";
import OrderItemsCardSkeleton from "./components/OrderItemsCard/OrderItemsCardSkeleton";
import OrderSummaryCardSkeleton from "./components/OrderSummaryCard/OrderSummaryCardSkeleton";
import PaymentCardSkeleton from "./components/PaymentCard/PaymentCardSkeleton";
import MyOrderDetailsContainer from "./components/MyOrderDetailsContainer";

const OrderDetailsLoadingPage = () => {
  return (
    <MyOrderDetailsContainer>
      <div className="space-y-5">
        <OrderIdCardSkeleton />
        <OrderItemsCardSkeleton />
      </div>

      <div className="space-y-4">
        <OrderSummaryCardSkeleton />
        <PaymentCardSkeleton />
        <DeliveryInfoCardSkeleton />
      </div>
    </MyOrderDetailsContainer>
  );
};

export default OrderDetailsLoadingPage;
