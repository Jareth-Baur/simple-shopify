import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// UPDATE a supplier
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> } // params is a Promise
) {
  // ✅ unwrap the promise first
  const { id } = await context.params;
  if (!id) {
    return NextResponse.json(
      { error: "Supplier ID required" },
      { status: 400 }
    );
  }

  try {
    const body = await req.json();

    const updatedSupplier = await prisma.supplier.update({
      where: { id },
      data: {
        name: body.name,
        contact: body.contact,
        address: body.address,
      },
    });

    return NextResponse.json(updatedSupplier);
  } catch (error: any) {
    console.error("PUT /api/suppliers/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update supplier" },
      { status: 500 }
    );
  }
}


export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const supplier = await prisma.supplier.findUnique({ where: { id: params.id } });
    if (!supplier) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(supplier);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE a supplier
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> } // params is a Promise
) {
  // ✅ unwrap the promise first
  const { id } = await context.params;
  if (!id) {
    return NextResponse.json(
      { error: "Supplier ID required" },
      { status: 400 }
    );
  }

  try {
    await prisma.supplier.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted" });
  } catch (error: any) {
    console.error("DELETE /api/suppliers/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete supplier" },
      { status: 500 }
    );
  }
}
