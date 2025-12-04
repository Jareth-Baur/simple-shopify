"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);

  const load = async () => {
    const res = await fetch("/api/suppliers");
    setSuppliers(await res.json());
  };

  useEffect(() => { load(); }, []);

  const removeSupplier = async (id: string) => {
    if (!confirm("Delete this supplier?")) return;

    await fetch(`/api/suppliers/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Suppliers</h1>
        <Link href="/admin/suppliers/add" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Supplier
        </Link>
      </div>

      <div className="space-y-3">
        {suppliers.map((s: any) => (
          <div key={s.id} className="p-4 bg-white shadow rounded flex justify-between">
            <div>
              <p className="font-semibold">{s.name}</p>
              <p className="text-sm text-gray-600">{s.contact}</p>
              <p className="text-sm text-gray-600">{s.address}</p>
            </div>

            <div className="flex gap-3">
              <Link
                href={`/admin/suppliers/${s.id}`}
                className="text-blue-600 underline"
              >
                Edit
              </Link>
              <button
                onClick={() => removeSupplier(s.id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
