import { createGuestId, getGuestId } from "./guestId";
import { getCurrentUser } from "./getCurrentUser";

interface UserOrGuestInfo {
  ownerId: string;
  userType: "user" | "guest";
}

export const getUserOrGuestInfo = async (): Promise<UserOrGuestInfo | null> => {
  const user = await getCurrentUser();

  if (user) {
    return {
      ownerId: user.id,
      userType: "user",
    };
  }

  const guestId = await getGuestId();
  if (guestId) {
    return {
      ownerId: guestId,
      userType: "guest",
    };
  }

  return null;
};

export const createGuestInfo = async (): Promise<UserOrGuestInfo> => {
  const guestId = await createGuestId();

  return {
    ownerId: guestId,
    userType: "guest",
  };
};
