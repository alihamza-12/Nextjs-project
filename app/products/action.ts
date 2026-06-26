"use server"; 

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createProduct } from "../product-db";

export async function handleCreateProductForm(formData: FormData) {
  // Extract values from the form inputs via their 'name' attributes
  const title = formData.get("title") as string;
  const priceString = formData.get("price") as string;
  const description = formData.get("description") as string || undefined;

  // Simple server-side validation check
  if (!title || !priceString) {
    throw new Error("Title and Price are required fields.");
  }

  const price = parseInt(priceString, 10);
  if (isNaN(price)) {
    throw new Error("Price must be a valid number.");
  }

  // Execute database insert
  await createProduct(title, price, description);

  // Clear Next.js cache for the products inventory list so the new item shows up instantly
  revalidatePath("/products");

  // Redirect the user back to the inventory list view
  redirect("/products");
}