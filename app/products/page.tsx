"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  id: string;
  title: string;
  vendor?: string;
  tags?: string[];
  variants: { price: number }[];
  images: { src: string }[];
  created_at: string;
}

const PAGE_SIZE = 12;

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [allTags, setAllTags] = useState<string[]>([]);

  async function fetchProducts() {
    const res = await fetch("/api/products");
    const data: Product[] = await res.json();
    setProducts(data);

    // Extract unique tags
    const tagsSet = new Set<string>();
    data.forEach(p => p.tags?.forEach(tag => tagsSet.add(tag)));
    setAllTags(["All", ...Array.from(tagsSet)]);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const filtered = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesTag = tagFilter === "All" || p.tags?.includes(tagFilter);
    return matchesSearch && matchesTag;
  });

  // Pagination
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <main className="min-h-screen p-6 bg-gradient-to-b from-indigo-50 to-purple-50">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-4xl font-extrabold text-gray-900">Products</h1>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {/* Search */}
          <input
            type="text"
            placeholder="Search products..."
            className="w-full md:w-64 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Tag Filter */}
          <select
            className="w-full md:w-48 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition"
            value={tagFilter}
            onChange={(e) => { setTagFilter(e.target.value); setCurrentPage(1); }}
          >
            {allTags.map((tag) => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginated.map((product) => {
          const price = product.variants[0]?.price ?? 0;
          const image = product.images[0]?.src?.trim() || "/placeholder.png";

          return (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 flex flex-col transform hover:-translate-y-1 hover:scale-105"
            >
              <div className="w-full h-56 overflow-hidden rounded-xl">
                <img
                  src={image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              <div className="mt-4 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{product.title}</h2>
                  <p className="text-gray-500 text-sm mt-1">{product.vendor || "Unknown Vendor"}</p>
                  {product.tags && product.tags.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {product.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mt-2">
                  <p className="text-indigo-600 font-bold text-lg">₱{price.toFixed(2)}</p>
                  <p className="text-gray-400 text-xs mt-1">Added: {new Date(product.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* No products */}
      {filtered.length === 0 && (
        <p className="text-center text-gray-500 mt-16 text-lg">No matching products found.</p>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded ${currentPage === i + 1 ? "bg-indigo-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}
