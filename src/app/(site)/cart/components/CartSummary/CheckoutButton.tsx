"use client";

import Button from "@/components/ui/Button";
import useModalById from "@/hooks/useModalById";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const CheckoutButton = () => {
  const { openModal: openAuthModal } = useModalById("authModal");
  const router = useRouter();
  const { data } = useSession();

  const isAuthenticated = !!data;

  if (isAuthenticated) {
    return (
      <Button href="/checkout" className="w-full">
        Proceed to Checkout
      </Button>
    );
  }

  const handleCheckout = () => {
    openAuthModal();
    router.replace("?callbackUrl=/checkout", { scroll: false });
  };

  return (
    <Button onClick={handleCheckout} className="w-full">
      Proceed to Checkout
    </Button>
  );
};

export default CheckoutButton;
