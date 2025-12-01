"use client";

import Link from "next/link";
import { AuthButton } from "@/app/components/AuthButton";
import AuthProvider from "@/app/components/AuthProvider";

export default function HomePage() {
  return (
    <AuthProvider>
      <main className="min-h-screen flex flex-col">
        {/* Navbar */}
        <nav className="w-full flex items-center justify-between px-6 py-4 border-b bg-white shadow-sm">
          <Link href="/" className="text-xl font-bold">
            Simple Shopify
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/products"
              className="text-sm font-medium hover:underline"
            >
              Products
            </Link>
            <AuthButton />
          </div>
        </nav>

        {/* Hero */}
        <section className="flex flex-1 flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl font-bold mb-4">Welcome to Simple Shopify</h1>
          <p className="text-gray-600 max-w-md mb-8">
            Explore products and manage your own catalog.
          </p>

          <Link
            href="/products"
            className="px-6 py-3 bg-blue-600 text-white text-lg rounded shadow hover:bg-blue-700 transition"
          >
            Browse Products
          </Link>
        </section>
      </main>
    </AuthProvider>
  );
}
