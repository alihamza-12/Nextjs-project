"use client"; 

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { handleUpdateProductForm, FormState } from "../../action";

const initialState: FormState = {
  success: false,
  message: "",
};

// Define the shape of our incoming initial product prop
interface EditProductFormProps {
  initialProduct: {
    id: number;
    title: string;
    price: number;
    description: string | null;
  };
}

export default function EditProductForm({ initialProduct }: EditProductFormProps) {
  const router = useRouter();

  const [formFields, setFormFields] = useState({
    title: initialProduct.title,
    price: initialProduct.price,
    description: initialProduct.description || "",
  });

  const [state, formAction, isPending] = useActionState(handleUpdateProductForm, initialState);

  // Navigate back away upon explicit update completion success
  useEffect(() => {
    if (state.success) {
      router.push(`/products/${initialProduct.id}`);
    }
  }, [state.success, router, initialProduct.id]);

  return (
    <div className="border p-6 rounded-lg shadow-md bg-white">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Edit Product #{initialProduct.id}</h1>
      
      {state.message && (
        <div className={`p-3 rounded mb-4 text-sm ${state.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {state.message}
        </div>
      )}

      <form action={formAction} className="space-y-4">
        {/* Hidden field passes id seamlessly */}
        <input type="hidden" name="id" value={initialProduct.id} />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
          <input
            type="text"
            name="title"
            disabled={isPending}
            value={formFields.title}
            onChange={(e) => setFormFields({ ...formFields, title: e.target.value })}
            className="w-full border p-2 rounded-md text-black focus:outline-blue-500"
          />
          {state.errors?.title && <p className="text-xs text-red-500 mt-1">{state.errors.title}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
          <input
            type="number"
            name="price"
            disabled={isPending}
            value={formFields.price}
            onChange={(e) => setFormFields({ ...formFields, price: parseInt(e.target.value, 10) || 0 })}
            className="w-full border p-2 rounded-md text-black focus:outline-blue-500"
          />
          {state.errors?.price && <p className="text-xs text-red-500 mt-1">{state.errors.price}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
          <textarea
            name="description"
            disabled={isPending}
            rows={4}
            value={formFields.description}
            onChange={(e) => setFormFields({ ...formFields, description: e.target.value })}
            className="w-full border p-2 rounded-md text-black focus:outline-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-medium py-2 rounded-md transition-colors mt-6 cursor-pointer"
        >
          {isPending ? "Updating SQLite..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}