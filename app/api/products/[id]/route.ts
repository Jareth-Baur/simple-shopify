import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

// SERVER VALIDATION (matches client rules, no File objects)
const ProductSchema = z.object({
  title: z.string().min(1),
  vendor: z.string().min(1),
  body_html: z.string().min(50),
  product_type: z.string().optional(),
  images: z
    .array(
      z.object({
        src: z.string().url(),
        alt: z.string().optional(),
      })
    )
    .optional(),
  variants: z
    .array(
      z.object({
        title: z.string().optional(),
        price: z.number().min(0.01),
        inventory_quantity: z.number().optional(),
      })
    )
    .min(1),
});

// GET product by ID
export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: { images: true, variants: true },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? "Server error" },
      { status: 500 }
    );
  }
}

// DELETE a product
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  // Await params before accessing
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ error: "Product ID required" }, { status: 400 });
  }

  try {
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ message: "Product deleted" });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}

// UPDATE a product
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> } // params is a Promise
) {
  // ✅ unwrap the promise first
  const { id } = await context.params;
  if (!id) return NextResponse.json({ error: "Product ID required" }, { status: 400 });

  try {
    const body = await req.json();

    const imagesData = body.images?.length
      ? { deleteMany: {}, create: body.images.map((img: any) => ({ src: img.src, alt: img.alt || "" })) }
      : undefined;

    const variantsData = body.variants?.length
      ? { deleteMany: {}, create: body.variants }
      : undefined;

    const tagsData = body.tags?.length
      ? { deleteMany: {}, create: body.tags.map((t: any) => ({ name: t.name })) }
      : undefined;

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        title: body.title,
        body_html: body.body_html,
        vendor: body.vendor,
        product_type: body.product_type,
        status: body.status,
        images: imagesData,
        variants: variantsData,
        tags: tagsData,
      },
      include: {
        images: true,
        variants: true,
        tags: true,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error: any) {
    console.error("PUT /api/products/[id] error:", error);
    return NextResponse.json({ error: error.message || "Failed to update product" }, { status: 500 });
  }
}
