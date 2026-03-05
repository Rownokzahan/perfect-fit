import { getCartItems } from "@/actions/cart/queries/getCartItems";
import NoCheckoutItemFound from "./components/NoCheckoutItemFound";
import YourCart from "./components/YourCart";
import CheckoutContainer from "./components/CheckoutContainer";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/utils/getCurrentUser";
import DeliveryInfoForm from "./components/DeliveryInfoForm";

export const metadata = {
  title: "Checkout",
};

const CheckoutPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/unauthorized");
  }

  const cartItems = await getCartItems();

  if (cartItems.length === 0) {
    return <NoCheckoutItemFound />;
  }

  return (
    <CheckoutContainer>
      <DeliveryInfoForm userName={user.name} userEmail={user.email} />
      <YourCart cartItems={cartItems} />
    </CheckoutContainer>
  );
};

export default CheckoutPage;
