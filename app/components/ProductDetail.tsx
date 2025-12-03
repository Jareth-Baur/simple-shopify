"use client";

import React, { useState } from "react";
import DOMPurify from "isomorphic-dompurify";

interface Image {
  id: string;
  src: string;
  alt?: string;
}

interface Variant {
  id: string;
  title?: string;
  price: number;
  sku?: string;
  inventory_quantity?: number;
}

interface Product {
  id: string;
  title: string;
  body_html: string;
  vendor?: string;
  product_type?: string;
  tags?: string[];
  images: Image[];
  variants: Variant[];
}

interface Props {
  product: Product;
}

export default function ProductDetail({ product }: Props) {
  const [mainImage, setMainImage] = useState(product.images[0]?.src || "/placeholder.png");

  if (!product) {
    return (
      <div className="p-6 max-w-xl mx-auto text-center text-red-600 font-semibold">
        Product not found
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white shadow-md rounded-xl p-6 flex flex-col md:flex-row gap-8">
        {/* Left: Images */}
        <div className="flex-1">
          <div className="rounded-xl overflow-hidden mb-4 border">
            <img
              src={mainImage}
              alt={product.title}
              className="w-full h-96 object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {product.images
              .filter((img) => img.src && img.src.trim() !== "") // skip empty src
              .map((img) => (
                <img
                  key={img.id}
                  src={img.src!.trim()} // safe because we filtered
                  alt={img.alt || product.title}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${mainImage === img.src ? "border-indigo-600" : "border-gray-200"
                    }`}
                  onClick={() => setMainImage(img.src!.trim())}
                />
              ))}
          </div>


        </div>

        {/* Right: Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{product.title}</h1>

            <div className="text-gray-500 mb-4 flex flex-wrap gap-2">
              {product.vendor && <span>Vendor: {product.vendor}</span>}
              {product.product_type && <span>Type: {product.product_type}</span>}
              {product.tags &&
                product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
            </div>

            <div
              className="prose max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.body_html) }}
            />
          </div>
        </div>
      </div>

      {/* Variants Table */}
      {product.variants.length > 0 && (
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Variants</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-2 text-gray-600">Variant</th>
                  <th className="text-left px-4 py-2 text-gray-600">Price (₱)</th>
                  <th className="text-left px-4 py-2 text-gray-600">Stock</th>
                  <th className="text-left px-4 py-2 text-gray-600">SKU</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {product.variants.map((v) => (
                  <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-2">{v.title || "Default"}</td>
                    <td className="px-4 py-2">{v.price.toFixed(2)}</td>
                    <td className="px-4 py-2">{v.inventory_quantity ?? "N/A"}</td>
                    <td className="px-4 py-2">{v.sku || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Created / Published */}
      <div className="bg-white shadow-md rounded-xl p-6 flex flex-wrap gap-4 text-gray-500 text-sm">
        <span>Created: {new Date().toLocaleDateString()}</span>
        {/* Add published date if available */}
      </div>
    </div>
  );
}
