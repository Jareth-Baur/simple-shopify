import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function CollectionsPage() {
  const collections = await prisma.product.findMany({
    distinct: ["product_type"],
    select: { product_type: true },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Collections</h1>
      <ul className="space-y-2">
        {collections.map((c) => (
          <li key={c.product_type}>
            <Link href={`/collections/${c.product_type}`}>
              <span className="text-blue-500 underline">{c.product_type || "Uncategorized"}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
