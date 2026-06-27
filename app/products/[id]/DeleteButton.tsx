"use client"; 

import { handleDeleteProduct } from "../action";

interface DeleteButtonProps {
  productId: number;
}

export default function DeleteButton({ productId }: DeleteButtonProps) {
  return (
    <form 
      action={handleDeleteProduct} 
      onSubmit={(e) => {
        if (!confirm("Are you sure you want to delete this product?")) {
          e.preventDefault(); // Safely cancels deletion if they choose cancel
        }
      }}
    >
      {/* Pass the ID through the hidden form input securely */}
      <input type="hidden" name="id" value={productId} />
      
      <button 
        type="submit" 
        className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded font-medium shadow-sm cursor-pointer"
      >
        Delete Product
      </button>
    </form>
  );
}