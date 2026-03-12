"use client";

import Button from "@/components/ui/Button";
import useModalById from "@/hooks/useModalById";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { LuLock } from "react-icons/lu";

interface CheckoutButtonProps {
  disabled: boolean;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ disabled }) => {
  const { openModal: openAuthModal } = useModalById("authModal");
  const router = useRouter();
  const { data } = useSession();

  const isAuthenticated = !!data;

  const handleClick = () => {
    if (disabled) {
      return;
    }

    if (isAuthenticated) {
      router.push("/checkout");
    } else {
      openAuthModal();
      router.replace("?callbackUrl=/checkout", { scroll: false });
    }
  };

  return (
    <Button onClick={handleClick} disabled={disabled} className="w-full mt-6 gap-2">
      {disabled && <LuLock />}
      <span>Proceed to Checkout</span>
    </Button>
  );
};

export default CheckoutButton;
