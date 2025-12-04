import EditSupplier from "../../components/EditSupplier";
import { prisma } from "@/lib/prisma";


interface PageProps {
  params: { id: string } | Promise<{ id: string }>;
}

export default async function SupplierPage(props: PageProps) {
  // unwrap params if it's a Promise
  const params = await props.params;
  const { id } = params;

  if (!id) return <p>No supplier ID provided</p>;

  const supplier = await prisma.supplier.findUnique({
    where: { id }, // string ID
  });

  if (!supplier) return <p>Supplier not found</p>;

  return <EditSupplier supplier={supplier} />;
}
