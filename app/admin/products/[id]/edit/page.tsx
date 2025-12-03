import AdminEditProductPage from "@/app/admin/components/AdminEditProductPage";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params; // ✅ unwrap the promise

  if (!id) return <div className="p-4 text-red-600">No product ID provided</div>;

  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: true, variants: true },
  });

  if (!product) return <div className="p-4 text-red-600">Product not found</div>;

  return <AdminEditProductPage product={product} />;
}
