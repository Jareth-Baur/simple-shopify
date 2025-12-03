"use client";

import Link from "next/link";

interface Image {
  id: string;
  src: string;
  alt?: string;
  width?: number;
  height?: number;
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
  images: Image[];
  variants: Variant[];
}

interface Props {
  product: Product;
}

export default function AdminProductView({ product }: Props) {
  return (
    <main className="p-6 max-w-4xl mx-auto bg-gray-50 rounded-xl shadow-md mt-8">
      <Link href="/admin/products" className="text-blue-600 underline mb-4 inline-block">
        ← Back to Products
      </Link>

      <h1 className="text-3xl font-bold mb-2">{product.title}</h1>

      <div className="mb-4 text-gray-600">
        {product.vendor && <span>Vendor: {product.vendor}</span>}
        {product.product_type && <span> | Type: {product.product_type}</span>}
      </div>

      <p className="mb-6">{product.body_html}</p>

      {product.images.length > 0 && (
        <div className="mb-6 grid grid-cols-2 md:grid-cols-3 gap-4">
          {product.images.map((img) => (
            <img
              key={img.id}
              src={img.src}
              alt={img.alt || product.title}
              width={img.width || 200}
              height={img.height || 200}
              className="border rounded shadow-sm object-cover w-full h-48"
            />
          ))}
        </div>
      )}

      {product.variants.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-2">Variants</h2>
          <ul className="space-y-2">
            {product.variants.map((v) => (
              <li key={v.id} className="p-2 border rounded">
                <strong>{v.title || "Default"}</strong> - ₱{v.price.toFixed(2)} - Stock:{" "}
                {v.inventory_quantity ?? "N/A"} {v.sku && `| SKU: ${v.sku}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
