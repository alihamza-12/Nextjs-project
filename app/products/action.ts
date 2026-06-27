"use server";

import { revalidatePath } from "next/cache";
import { createProduct } from "../product-db";

// Define the shape of our form state response
export type FormState = {
  success: boolean;
  message: string;
  errors?: {
    title?: string;
    price?: string;
  };
};

export async function handleCreateProductForm(
  prevState: FormState, 
  formData: FormData
): Promise<FormState> {
  const title = formData.get("title") as string;
  const priceString = formData.get("price") as string;
  const description = formData.get("description") as string || undefined;

  // Track validation anomalies
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
    
    // Refresh the list view background cache
    revalidatePath("/products");
    
    return { success: true, message: "Product created successfully! ✅" };
  } catch (error) {
    return { success: false, message: "Database connection failure." };
  }
}