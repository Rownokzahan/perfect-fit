import { getCurrentUser } from "./getCurrentUser";

/**
 * Returns true if the current user is an admin, false otherwise
 */
export const isCurrentUserAdmin = async (): Promise<boolean> => {
  const user = await getCurrentUser();
  return !!user && user.role === "admin";
};

// Returned when a user is not an admin
type AdminError = { error: true; message: string };

/**
 * Makes any async server function admin-only.
 *
 * Automatically checks the user's session and role.
 * Returns an AdminError if the user is not an admin.
 *
 * Example usage:
 * const deleteProduct = adminProtected(async (productId: Id) => { ... });
 * const result = await deleteProduct("123");
 */
export const requireAdmin = <Args extends unknown[], Result>(
  fn: (...args: Args) => Promise<Result>,
) => {
  return async (...args: Args): Promise<Result | AdminError> => {
    const admin = await isCurrentUserAdmin();
    if (!admin) {
      return { error: true, message: "Unauthorized" };
    }

    return fn(...args);
  };
};
