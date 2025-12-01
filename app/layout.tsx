import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simple Shopify",
  description: "Shopify-like product catalog for exam",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
