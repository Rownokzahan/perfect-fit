import { Playfair_Display, Lora } from "next/font/google";

export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-playfair",
  display: "swap", // Prevents invisible text while loading
  fallback: ["Times New Roman", "serif"], // The "serif" fallback
});

export const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-lora",
  display: "swap",
  fallback: ["serif"], // The "serif" fallback
});
