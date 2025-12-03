"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  id: string;
  title: string;
  vendor?: string;
  variants: { price: number }[];
  images: { src: string }[];
  created_at: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Fetch products
  async function fetchProducts() {
    setLoading(true);
    const res = await fetch("/api/products");
    if (!res.ok) return;
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) fetchProducts(); // refresh list
    else alert("Failed to delete product");
  };

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome, Admin!
          </h1>
          <p className="text-gray-500">
            Manage your store products below. You can create, edit, or delete items.
          </p>
        </div>

        <Link
          href="/admin/products/add"
          className="mt-4 sm:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl shadow transition"
        >
          + Add Product
        </Link>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          placeholder="Search products..."
          className="w-full max-w-md p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Products Grid */}
      {loading ? (
        <p>Loading products...</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product) => {
            const price = product.variants[0]?.price ?? 0;

            // Fix for empty string src
            const image =
              product.images[0]?.src && product.images[0].src.trim() !== ""
                ? product.images[0].src
                : "/placeholder.png";

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col"
              >
                <div className="w-full h-48 overflow-hidden rounded-xl mb-4">
                  <img
                    src={image}
                    alt={product.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
                  />
                </div>

                <h2 className="text-xl font-semibold text-gray-800">{product.title}</h2>
                <p className="text-gray-500 text-sm mt-1">
                  {product.vendor || "Unknown Vendor"}
                </p>
                <p className="text-indigo-600 font-bold mt-2 text-lg">
                  ₱{price.toFixed(2)}
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  Added: {new Date(product.created_at).toLocaleDateString()}
                </p>

                {/* Actions */}
                <div className="mt-4 flex gap-2">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="flex-1 bg-yellow-400 text-white py-1 rounded hover:bg-yellow-500 text-center transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
