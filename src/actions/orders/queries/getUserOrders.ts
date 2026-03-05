import { connectToDatabase } from "@/lib/db";
import { getCurrentUser } from "@/lib/utils/getCurrentUser";
import { toPlainObject } from "@/lib/utils/object";
import OrderModel from "@/models/OrderModel";
import { Id } from "@/types";
import { OrderType } from "@/types/order";
import { cacheLife, cacheTag } from "next/cache";
import { redirect } from "next/navigation";

const getCachedUserOrders = async (userId: Id): Promise<OrderType[]> => {
  "use cache";
  cacheTag(`orders-${userId}`);
  cacheLife("hours");

  try {
    await connectToDatabase();

    const orders = await OrderModel.find({ user: userId })
      .sort({ createdAt: -1 })
      .lean();

    return toPlainObject(orders) as unknown as OrderType[];
  } catch (err) {
    console.error("Failed to fetch user orders", err);
    return [];
  }
};

export const getUserOrders = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/unauthorized");
  }

  return getCachedUserOrders(user.id);
};
