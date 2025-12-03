import AdminProductView from "@/app/admin/components/AdminProductView";
import { prisma } from "@/lib/prisma";

interface Props {
  params: { id: string };
}

export default async function AdminProductPage({ params }: Props) {
  const { id } = await params;

  if (!id) return <div className="p-4 text-red-600">No product ID provided</div>;

  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: true, variants: true },
  });

  if (!product) return <div className="p-4 text-red-600">Product not found</div>;

  return <AdminProductView product={product} />;
}
