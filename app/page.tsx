"use client";

import Link from "next/link";
import { AuthButton } from "@/app/components/AuthButton";
import AuthProvider from "@/app/components/AuthProvider";

export default function HomePage() {
  return (
    <AuthProvider>
      <main className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-50 to-purple-50">
        {/* Navbar */}
        <nav className="w-full flex items-center justify-between px-8 py-4 bg-white shadow-md rounded-b-xl">
          <Link href="/" className="text-2xl font-bold text-indigo-700">
            Simple Shopify
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/products"
              className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
            >
              Products
            </Link>
            <AuthButton />
          </div>
        </nav>

        {/* Hero Section */}
        <section className="flex flex-1 flex-col items-center justify-center text-center px-6 py-12">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 animate-fadeIn">
            Welcome to <span className="text-indigo-600">Simple Shopify</span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-lg mb-8 animate-fadeIn delay-200">
            Explore products, manage your own catalog, and enjoy a modern e-commerce experience.
          </p>

          <Link
            href="/products"
            className="px-8 py-4 bg-indigo-600 text-white text-lg md:text-xl font-semibold rounded-xl shadow-lg hover:bg-indigo-700 transition transform hover:scale-105"
          >
            Browse Products
          </Link>
        </section>

        {/* Footer */}
        <footer className="w-full text-center py-6 bg-white shadow-inner mt-auto">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Simple Shopify. All rights reserved.
          </p>
        </footer>
      </main>
    </AuthProvider>
  );
}
