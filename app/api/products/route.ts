import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET all products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { images: true, variants: true },
      orderBy: { created_at: "desc" },
    });
    return NextResponse.json(products);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST create a new product
export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Basic server-side validation
    if (!data.title || data.title.trim() === "") {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    if (!data.body_html || data.body_html.trim().length < 50) {
      return NextResponse.json(
        { error: "Description must be at least 50 characters" },
        { status: 400 }
      );
    }
    if (!data.vendor || data.vendor.trim() === "") {
      return NextResponse.json({ error: "Vendor is required" }, { status: 400 });
    }
    if (!data.variants || !Array.isArray(data.variants) || data.variants.length === 0) {
      return NextResponse.json({ error: "At least one variant is required" }, { status: 400 });
    }

    const created = await prisma.product.create({
      data: {
        title: data.title.trim(),
        body_html: data.body_html.trim(),
        vendor: data.vendor.trim(),
        product_type: data.product_type?.trim() || null,
        images: {
          create:
            data.images
              ?.filter((img: { src?: string }) => img.src && img.src.trim() !== "")
              .map((img: { src: string }) => ({ src: img.src.trim() })) || [],
        },
        variants: {
          create: data.variants.map((v: { price: number; title?: string }) => ({
            price: v.price,
            title: v.title?.trim() || null,
            sku: v.sku?.trim() || null,
            inventory_quantity: v.inventory_quantity ?? 0,
          })),
        },
      },
      include: { images: true, variants: true },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
