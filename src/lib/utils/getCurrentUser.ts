import { headers } from "next/headers";
import { auth } from "../auth";

/**
 * Get the current authenticated user or undefined
 *
 * @note This function should ONLY be used in Server Actions or Server Components.
 * Do NOT use this in Client Components.
 */
export const getCurrentUser = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user;
};
