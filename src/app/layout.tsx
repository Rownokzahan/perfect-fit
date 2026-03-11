import { Metadata } from "next";
import "@/styles/index.css";
import { lora, playfair } from "@/fonts";
import { Toaster } from "react-hot-toast";
import AuthModal from "@/components/modals/AuthModal";
import { Suspense } from "react";
import AddToCartModal from "@/components/modals/AddToCartModal";
import ConfirmLogoutModal from "@/components/modals/ConfirmLogoutModal";
import ConfirmActionModal from "@/components/modals/ConfirmActionModal";
import OrderSuccessModal from "@/components/modals/OrderSuccessModal";
import clsx from "clsx";

export const metadata: Metadata = {
  title: {
    template: "%s | Perfect Fit",
    default: "Perfect Fit",
  },
  description: "A custom dress making website",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
        className={clsx(
          // Global: Sets Lora as the default font for all text
          lora.className,

          // Utility: Enables CSS variable (--font-playfair) for specific "Playfair" headings
          playfair.variable,
          "bg-light antialiased text-dark",
        )}
      >
        {children}

        <Suspense fallback={null}>
          <AddToCartModal />
          <AuthModal />
          <ConfirmLogoutModal />
          <ConfirmActionModal />
          <OrderSuccessModal />
        </Suspense>

        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
