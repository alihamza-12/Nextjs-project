// app/products/[id]/edit/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductFromId } from "../../../product-db"; // 👈 Database fetches safely on Server
import EditProductForm from "./EditProductForm"; // 👈 Pulls in your new Client form layout

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const productId = parseInt(id, 10);

  if (isNaN(productId)) {
    return notFound();
  }

  // Fetching data cleanly on the server before the browser page even renders
  const product = await getProductFromId(productId);

  if (!product) {
    return notFound();
  }

  return (
    <main className="p-8 max-w-md mx-auto">
      <Link href={`/products/${productId}`} className="text-blue-500 hover:underline mb-6 inline-block">
        ← Cancel
      </Link>

      {/* Feed the product model into your Client Component as a prop */}
      <EditProductForm initialProduct={product} />
    </main>
  );
}