"use client";

import Link from "next/link";

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      {/* Welcome Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Welcome, Admin!
        </h1>
        <p className="text-gray-600 mb-6">
          Manage your store products, variants, and more from the dashboard below.
        </p>
        <Link
          href="/admin/products"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition"
        >
          Go to Product Management
        </Link>
      </div>

      {/* Quick Stats or Info Section (Optional) */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          <h2 className="text-2xl font-semibold mb-2">Products</h2>
          <p className="text-gray-500">View and manage all products</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          <h2 className="text-2xl font-semibold mb-2">Orders</h2>
          <p className="text-gray-500">Track your orders (coming soon)</p>
        </div>
      </div>
    </main>
  );
}
