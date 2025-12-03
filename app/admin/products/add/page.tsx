"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ProductSchema = z.object({
  title: z.string().min(1, "Title is required"),
  body_html: z.string().min(50, "Description must be at least 50 characters"),
  vendor: z.string().min(1, "Vendor is required"),
  product_type: z.string().optional(),
  tags: z.string().optional(),
  images: z.array(
    z.object({
      src: z.string().optional(),
      file: z.instanceof(File).optional(),
      alt: z.string().optional(),
    })
  ).optional(),
  options: z.array(
    z.object({
      name: z.string(),
      values: z.array(z.string()).min(1, "At least one value required"),
    })
  ).optional(),
  variants: z.array(
    z.object({
      title: z.string().optional(),
      price: z.number().min(0.01, "Price must be greater than 0"),
      sku: z.string().optional(),
      inventory_quantity: z.number().optional(),
    })
  ).min(1, "At least one variant is required"),
});

type ProductFormData = z.infer<typeof ProductSchema>;

interface Toast {
  message: string;
  type: "success" | "error";
}

export default function AddProductPage() {
  const router = useRouter();
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [imagePreviews, setImagePreviews] = useState<Record<number, string>>({});

  const addToast = (message: string, type: "success" | "error") => {
    setToasts((prev) => [...prev, { message, type }]);
    setTimeout(() => setToasts((prev) => prev.slice(1)), 3000);
  };

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      images: [],
      variants: [{ price: 0 }],
      options: [],
    },
  });

  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
    name: "images",
    control,
  });

  const { fields: variantFields, append: appendVariant, remove: removeVariant } = useFieldArray({
    name: "variants",
    control,
  });

  const { fields: optionFields, append: appendOption, remove: removeOption } = useFieldArray({
    name: "options",
    control,
  });

  // Watch image fields to create live previews
  const watchImages = watch("images");
  useEffect(() => {
    const previews: Record<number, string> = {};
    watchImages?.forEach((img, idx) => {
      if (img.file) {
        const url = URL.createObjectURL(img.file);
        previews[idx] = url;
      } else if (img.src) {
        previews[idx] = img.src;
      }
    });
    setImagePreviews(previews);
  }, [watchImages]);

  const onSubmit = async (data: ProductFormData) => {
    try {
      const images = await Promise.all(
        (data.images || []).map(async (img) => {
          if (img.file) {
            const base64 = await new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result as string);
              reader.onerror = () => reject("Failed to read file");
              reader.readAsDataURL(img.file);
            });
            return { src: base64, alt: img.alt };
          }
          return img;
        })
      );

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          images,
          tags: data.tags ? data.tags.split(",").map((t) => t.trim()) : [],
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        addToast(err.error || "Failed to create product", "error");
        return;
      }

      addToast("Product created successfully!", "success");
      setTimeout(() => router.push("/admin/products"), 1500);
    } catch {
      addToast("Failed to create product", "error");
    }
  };

  return (
    <main className="p-6 max-w-4xl mx-auto bg-gray-50 rounded-xl shadow-md mt-8 relative">
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>

      {/* Toasts */}
      <div className="fixed top-4 right-4 flex flex-col gap-2 z-50">
        {toasts.map((t, i) => (
          <div
            key={i}
            className={`px-4 py-2 rounded shadow-lg text-white ${
              t.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-semibold mb-1">Title *</label>
          <input
            {...register("title")}
            placeholder="Product title"
            className="w-full p-2 border rounded"
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1">Description *</label>
          <textarea
            {...register("body_html")}
            placeholder="Write at least 50 characters describing the product"
            className="w-full p-2 border rounded"
            rows={4}
          />
          {errors.body_html && <p className="text-red-500">{errors.body_html.message}</p>}
        </div>

        {/* Vendor */}
        <div>
          <label className="block font-semibold mb-1">Vendor *</label>
          <input
            {...register("vendor")}
            placeholder="Vendor name"
            className="w-full p-2 border rounded"
          />
          {errors.vendor && <p className="text-red-500">{errors.vendor.message}</p>}
        </div>

        {/* Product Type */}
        <div>
          <label className="block font-semibold mb-1">Product Type (Optional)</label>
          <input
            {...register("product_type")}
            placeholder="Electronics, Apparel, etc."
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block font-semibold mb-1">Tags (Optional)</label>
          <input
            {...register("tags")}
            placeholder="Comma separated tags, e.g., new, sale"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Images */}
        <div>
          <label className="block font-semibold mb-1">Images (Optional)</label>
          {imageFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mb-2 items-center">
              <input
                {...register(`images.${index}.src` as const)}
                placeholder="Image URL"
                className="flex-1 p-2 border rounded"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setValue(`images.${index}.file`, e.target.files?.[0])}
                className="border p-1 rounded"
              />
              {imagePreviews[index] && (
                <img
                  src={imagePreviews[index]}
                  alt="preview"
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="bg-red-500 text-white px-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendImage({ src: "" })}
            className="bg-green-500 text-white px-4 py-1 rounded"
          >
            Add Image
          </button>
        </div>

        {/* Options */}
        <div>
          <label className="block font-semibold mb-1">Options (Optional)</label>
          {optionFields.map((field, index) => (
            <div key={field.id} className="mb-2 border p-2 rounded">
              <input
                {...register(`options.${index}.name` as const)}
                placeholder="Option name (e.g., Size, Color)"
                className="w-full p-2 border rounded mb-1"
              />
              <Controller
                control={control}
                name={`options.${index}.values` as const}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Comma separated values"
                    onChange={(e) => field.onChange(e.target.value.split(","))}
                    className="w-full p-2 border rounded"
                  />
                )}
              />
              <button
                type="button"
                onClick={() => removeOption(index)}
                className="mt-1 bg-red-500 text-white px-2 rounded"
              >
                Remove Option
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendOption({ name: "", values: [""] })}
            className="bg-green-500 text-white px-4 py-1 rounded"
          >
            Add Option
          </button>
        </div>

        {/* Variants */}
        <div>
          <label className="block font-semibold mb-1">Variants *</label>
          {variantFields.map((field, index) => (
            <div key={field.id} className="mb-2 border p-2 rounded">
              <input
                {...register(`variants.${index}.title` as const)}
                placeholder="Variant title (optional)"
                className="w-full p-2 border rounded mb-1"
              />
              <input
                type="number"
                {...register(`variants.${index}.price` as const, { valueAsNumber: true })}
                placeholder="Price (₱)"
                className="w-full p-2 border rounded mb-1"
              />
              {errors.variants?.[index]?.price && (
                <p className="text-red-500">{errors.variants[index]?.price?.message}</p>
              )}
              <input
                {...register(`variants.${index}.sku` as const)}
                placeholder="SKU (optional)"
                className="w-full p-2 border rounded mb-1"
              />
              <input
                type="number"
                {...register(`variants.${index}.inventory_quantity` as const, { valueAsNumber: true })}
                placeholder="Inventory quantity (optional)"
                className="w-full p-2 border rounded mb-1"
              />
              <button
                type="button"
                onClick={() => removeVariant(index)}
                className="bg-red-500 text-white px-2 rounded"
              >
                Remove Variant
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendVariant({ price: 0 })}
            className="bg-green-500 text-white px-4 py-1 rounded"
          >
            Add Variant
          </button>
          {errors.variants && typeof errors.variants.message === "string" && (
            <p className="text-red-500">{errors.variants.message}</p>
          )}
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Create Product
          </button>
        </div>
      </form>
    </main>
  );
}
