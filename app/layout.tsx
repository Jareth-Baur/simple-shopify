// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import SessionProviderClient from ".//SessionProviderClient";
export const metadata: Metadata = {
  title: "Simple Shopify",
  description: "Shopify-like product catalog for exam",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProviderClient>{children}</SessionProviderClient>
      </body>
    </html>
  );
}
