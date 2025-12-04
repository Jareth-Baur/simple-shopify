import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const data = await req.json();

    const updated = await prisma.supplier.update({
      where: { id },
      data: {
        name: data.name,
        contact: data.contact,
        address: data.address,
      },
    });

    return NextResponse.json(updated);
  } catch (err: any) {
    console.error("PUT ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 400 });
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

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.supplier.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Deleted" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
