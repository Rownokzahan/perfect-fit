import { Lora, Karla } from "next/font/google";

export const headingFont = Lora({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const bodyFont = Karla({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});
