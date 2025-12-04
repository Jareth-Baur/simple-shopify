import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const suppliers = await prisma.supplier.findMany({
    orderBy: { createdAt: "desc" }
  });
  return NextResponse.json(suppliers);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const supplier = await prisma.supplier.create({
      data: {
        name: data.name,
        contact: data.contact,
        address: data.address,
      },
    });

    return NextResponse.json(supplier);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
