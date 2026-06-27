"use server";

import { revalidatePath } from "next/cache";
import { createProduct, updateProduct } from "../product-db"; 

// Define the shape of our form state response (Shared by both functions)
export type FormState = {
  success: boolean;
  message: string;
  errors?: {
    title?: string;
    price?: string;
  };
};

// ==========================================
// 1. CREATE ACTION
// ==========================================
export async function handleCreateProductForm(
  prevState: FormState, 
  formData: FormData
): Promise<FormState> {
  const title = formData.get("title") as string;
  const priceString = formData.get("price") as string;
  const description = formData.get("description") as string || undefined;

  const errors: FormState["errors"] = {};
  if (!title) errors.title = "Title is required.";
  if (!priceString) errors.price = "Price is required.";

  if (Object.keys(errors).length > 0) {
    return { success: false, message: "Validation failed.", errors };
  }

  const price = parseInt(priceString, 10);
  if (isNaN(price)) {
    return { success: false, message: "Validation failed.", errors: { price: "Price must be a number." } };
  }

  try {
    await createProduct(title, price, description);
    revalidatePath("/products");
    return { success: true, message: "Product created successfully! ✅" };
  } catch (error) {
    return { success: false, message: "Database connection failure." };
  }
}

// ==========================================
// 2. UPDATE ACTION (Add this right underneath)
// ==========================================
export async function handleUpdateProductForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const idString = formData.get("id") as string; // 👈 Reads the hidden input from the Edit form
  const title = formData.get("title") as string;
  const priceString = formData.get("price") as string;
  const description = formData.get("description") as string || undefined;

  const errors: FormState["errors"] = {};
  if (!title) errors.title = "Title is required.";
  if (!priceString) errors.price = "Price is required.";

  if (Object.keys(errors).length > 0) {
    return { success: false, message: "Validation failed.", errors };
  }

  const id = parseInt(idString, 10);
  const price = parseInt(priceString, 10);

  if (isNaN(id) || isNaN(price)) {
    return { success: false, message: "Invalid product parameters." };
  }

  try {
    // Execute the update in SQLite
    await updateProduct(id, title, price, description);
    
    // Clear cache for both the main list page and the single detail page
    revalidatePath("/products");
    revalidatePath(`/products/${id}`);
    
    return { success: true, message: "Product updated successfully! ✅" };
  } catch (error) {
    return { success: false, message: "Failed to update database record." };
  }
}