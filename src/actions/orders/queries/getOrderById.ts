import { connectToDatabase } from "@/lib/db";
import { getCurrentUser } from "@/lib/utils/getCurrentUser";
import { toPlainObject } from "@/lib/utils/object";
import OrderModel from "@/models/OrderModel";
import { Id } from "@/types";
import { OrderType } from "@/types/order";
import { cacheTag } from "next/cache";
import { redirect } from "next/navigation";

interface GetCachedOrderParams {
  orderId: Id;
  userId: Id;
  isAdmin: boolean;
}

const getCachedOrder = async ({
  orderId,
  userId,
  isAdmin,
}: GetCachedOrderParams): Promise<OrderType | null> => {
  "use cache";
  cacheTag(`order-${orderId}`);

  try {
    await connectToDatabase();

    const order = await OrderModel.findOne({
      _id: orderId,
      ...(isAdmin ? {} : { user: userId }),
    });

    if (!order) {
      return null;
    }

    return toPlainObject(order) as unknown as OrderType;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getOrderById = async (orderId: Id) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("unauthorized");
  }

  const isAdmin = user.role === "admin";

  return getCachedOrder({ orderId, userId: user.id, isAdmin });
};
