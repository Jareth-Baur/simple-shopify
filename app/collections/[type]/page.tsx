import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function CollectionView({ params }: { params: { type: string } }) {
  const products = await prisma.product.findMany({
    where: { product_type: params.type },
    include: { images: true, variants: true },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 capitalize">{params.type}</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <Link key={p.id} href={`/products/${p.id}`}>
            <div className="border rounded-lg p-4 hover:border-blue-500">
              <img src={p.images[0]?.src || "/no-image.png"} className="w-full h-40 object-cover" />
              <h2 className="mt-2 font-medium">{p.title}</h2>
              <p className="text-sm text-gray-600">₱{p.variants[0]?.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
