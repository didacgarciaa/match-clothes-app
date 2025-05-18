import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { colors } from "@/lib/config/colors";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Match Clothes App",
  description: "Intelligent clothing matching and virtual try-on application",
  keywords: ["clothing", "fashion", "matching", "ai", "virtual try-on"],
  authors: [{ name: "Match Clothes Team" }],
  viewport: "width=device-width, initial-scale=1",
};

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ backgroundColor: colors.background }}>
        {children}
      </body>
    </html>
  );
}
