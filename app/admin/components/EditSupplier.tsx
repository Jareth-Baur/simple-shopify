"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Supplier {
  id: string;
  name: string;
  contact: string;
  address: string;
}

interface Props {
  supplier: Supplier;
}

interface Toast {
  message: string;
  type: "success" | "error";
}

export default function EditSupplier({ supplier }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: supplier.name,
    contact: supplier.contact,
    address: supplier.address,
  });
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: "success" | "error") => {
    setToasts((prev) => [...prev, { message, type }]);
    setTimeout(() => setToasts((prev) => prev.slice(1)), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`/api/suppliers/${supplier.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json();
        console.error("Update failed:", err);
        addToast(err.error || "Failed to update supplier", "error");
        return;
      }

      addToast("Supplier updated successfully!", "success");
      setTimeout(() => router.push("/admin/suppliers"), 1500);
    } catch (err) {
      console.error(err);
      addToast("Failed to update supplier", "error");
    }
  };

  return (
    <main className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Edit Supplier</h1>

      {/* Toasts */}
      <div className="fixed top-4 right-4 flex flex-col gap-2 z-50">
        {toasts.map((t, i) => (
          <div key={i} className={`px-4 py-2 rounded text-white ${t.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
            {t.message}
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Supplier Name"
          className="w-full p-2 border rounded"
        />
        <input
          name="contact"
          value={form.contact}
          onChange={handleChange}
          placeholder="Contact"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleSubmit}
          className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
        <button
          onClick={() => router.push("/admin/suppliers")}
          className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </main>
  );
}
