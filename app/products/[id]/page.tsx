import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductFromId } from "../../product-db"; 

type ProductDetailPageProps = {
  params: Promise<{ id: string }>; // In Next.js 15+, params is a Promise
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
    
  const { id } = await params;
  
  // Convert string id (e.g., "1") into a number for Prisma
  const productId = parseInt(id, 10);
  
  if (isNaN(productId)) {
    return notFound();
  }

  // Fetch the individual product data
  const product = await getProductFromId(productId);

  // If the product doesn't exist in the SQLite DB, trigger Next.js 404 page
  if (!product) {
    return notFound();
  }

  return (
    <main className="p-8 max-w-xl mx-auto">
      <Link href="/products" className="text-blue-500 hover:underline mb-6 inline-block">
        ← Back to Inventory
      </Link>
      
      <div className="border p-6 rounded-lg shadow-md bg-white">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
          Product ID: #{product.id}
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mt-1 mb-2">
          {product.title}
        </h1>
        <p className="text-2xl font-semibold text-emerald-600 mb-4">
          ${product.price}
        </p>
        <div className="border-t pt-4 mt-4 text-gray-700">
          <h3 className="font-medium text-gray-500 mb-1">Description</h3>
          <p>{product.description || "No description provided for this item."}</p>
        </div>
      </div>
    </main>
  );
}