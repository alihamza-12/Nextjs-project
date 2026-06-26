import Link from "next/link";
import { handleCreateProductForm } from "../action";

export default function CreateProductPage() {
  return (
    <main className="p-8 max-w-md mx-auto">
      <Link href="/products" className="text-blue-500 hover:underline mb-6 inline-block">
        ← Cancel & Go Back
      </Link>

      <div className="border p-6 rounded-lg shadow-md bg-white">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Add New Product</h1>
        
        {/* The action attribute hooks directly up to your Server Action */}
        <form action={handleCreateProductForm} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Title *
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g., Mechanical Keyboard"
              className="w-full border p-2 rounded-md focus:outline-blue-500 text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price ($) *
            </label>
            <input
              type="number"
              name="price"
              required
              min="0"
              placeholder="e.g., 99"
              className="w-full border p-2 rounded-md focus:outline-blue-500 text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              name="description"
              rows={4}
              placeholder="Write a brief description of the product features..."
              className="w-full border p-2 rounded-md focus:outline-blue-500 text-black"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-colors mt-6 cursor-pointer"
          >
            Save Product
          </button>
        </form>
      </div>
    </main>
  );
}