import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductFromId } from "../../product-db";
import DeleteButton from "./DeleteButton";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const productId = parseInt(id, 10);
  
  if (isNaN(productId)) {
    return notFound();
  }

  const product = await getProductFromId(productId);

  if (!product) {
    return notFound();
  }

  return (
    <main className="p-8 max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Link href="/products" className="text-blue-500 hover:underline">
          ← Back to Inventory
        </Link>
        
        {/* ACTION BUTTON WRAPPER */}
        <div className="flex gap-2">
          <Link 
            href={`/products/${product.id}/edit`} 
            className="bg-amber-500 hover:bg-amber-600 text-white text-sm px-4 py-2 rounded font-medium shadow-sm"
          >
            Edit Product
          </Link>

         {/* 👈 Replace the old form with your clean client component */}
          <DeleteButton productId={product.id} />
        </div>
      </div>
      
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