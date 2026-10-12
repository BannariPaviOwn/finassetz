import type { Metadata, Viewport } from "next";
import { Newsreader, Outfit } from "next/font/google";
import "./globals.css";

const sans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const display = Newsreader({
  subsets: ["latin"],
  variable: "--font-display",
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "FinAssetZ Investment Services",
  description:
    "FinAssetZ Investment Services distributes mutual funds, bonds, portfolio management schemes and other financial products from Chennai.",
};

export const viewport: Viewport = {
  themeColor: "#2AA5DD",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}
