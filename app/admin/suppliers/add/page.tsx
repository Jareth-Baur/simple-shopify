"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddSupplier() {
  const [form, setForm] = useState({ name: "", contact: "", address: "" });
  const router = useRouter();

  const save = async () => {
    await fetch("/api/suppliers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/admin/suppliers");
  };

  return (
    <main className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Add Supplier</h1>

      <input
        className="w-full p-2 border rounded"
        placeholder="Supplier Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="w-full p-2 border rounded"
        placeholder="Contact"
        onChange={(e) => setForm({ ...form, contact: e.target.value })}
      />

      <input
        className="w-full p-2 border rounded"
        placeholder="Address"
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />

      <button
        onClick={save}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Save
      </button>
    </main>
  );
}
