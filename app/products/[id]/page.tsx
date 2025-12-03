import ProductDetail from "../../components/ProductDetail";
import { prisma } from "@/lib/prisma";

interface Props {
  params: { id: string}; // Next.js 16+ treats params as possibly a Promise
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;

  if (!id) {
    return <div className="p-4 text-red-600">No product ID provided</div>;
  }

  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: true, variants: true },
  });

  if (!product) {
    return <div className="p-4 text-red-600">Product not found</div>;
  }

  return <ProductDetail product={{ ...product, body_html: product.body_html ?? "", vendor: product.vendor ?? "" }} />;
}
