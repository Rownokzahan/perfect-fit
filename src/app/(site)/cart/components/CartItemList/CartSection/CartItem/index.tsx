"use client";

import { CartItemType } from "@/types/cart";
import CartItemActions from "./CartItemActions";
import ItemCustomizations from "./ItemCustomizations";
import ItemInfo from "./ItemInfo";
import { useState } from "react";
import clsx from "clsx";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const [showCustomizations, setShowCustomizations] = useState(false);

  const toggleCustomizations = () => setShowCustomizations((prev) => !prev);

  const isUnvailable = item.availability !== "available";

  return (
    <div className="bg-light-light rounded">
      <div className={clsx("p-4 rounded", isUnvailable && "bg-danger/8 border border-danger/10")}>
        <ItemInfo
          item={item}
          showCustomizations={showCustomizations}
          toggleCustomizations={toggleCustomizations}
        />

        {showCustomizations && (
          <ItemCustomizations customizations={item.customizations} />
        )}

        <CartItemActions item={item} availability={item.availability} />
      </div>
    </div>
  );
};

export default CartItem;
