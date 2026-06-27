"use client"; 

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { handleCreateProductForm, FormState } from "../action";

const initialState: FormState = {
  success: false,
  message: "",
};

export default function CreateProductPage() {
  const router = useRouter();
  
  // useActionState returns: [current state object, form submit dispatcher, pending boolean state]
  const [state, formAction, isPending] = useActionState(
    handleCreateProductForm,
    initialState
  );

  // Automatically send the user away only if creation succeeds
  useEffect(() => {
    if (state.success) {
      router.push("/products");
    }
  }, [state.success, router]);

  return (
    <main className="p-8 max-w-md mx-auto">
      <Link href="/products" className="text-blue-500 hover:underline mb-6 inline-block">
        ← Cancel & Go Back
      </Link>

      <div className="border p-6 rounded-lg shadow-md bg-white">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Add New Product</h1>
        
        {/* State Banner Feedback Message */}
        {state.message && (
          <div className={`p-3 rounded mb-4 text-sm ${state.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {state.message}
          </div>
        )}

        {/* Form action connects directly to our custom hook dispatcher */}
        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Title *
            </label>
            <input
              type="text"
              name="title"
              disabled={isPending}
              placeholder="e.g., Mechanical Keyboard"
              className="w-full border p-2 rounded-md focus:outline-blue-500 text-black disabled:bg-gray-100"
            />
            {state.errors?.title && (
              <p className="text-xs text-red-500 mt-1">{state.errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price ($) *
            </label>
            <input
              type="number"
              name="price"
              disabled={isPending}
              min="0"
              placeholder="e.g., 99"
              className="w-full border p-2 rounded-md focus:outline-blue-500 text-black disabled:bg-gray-100"
            />
            {state.errors?.price && (
              <p className="text-xs text-red-500 mt-1">{state.errors.price}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              name="description"
              disabled={isPending}
              rows={4}
              placeholder="Write a brief description..."
              className="w-full border p-2 rounded-md focus:outline-blue-500 text-black disabled:bg-gray-100"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 rounded-md transition-colors mt-6 cursor-pointer flex justify-center items-center"
          >
            {isPending ? "Saving to SQLite..." : "Save Product"}
          </button>
        </form>
      </div>
    </main>
  );
}