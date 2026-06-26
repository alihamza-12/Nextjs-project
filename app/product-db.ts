import prisma from "@/lib/prisma";

export async function getAllProducts() {
    try {
    const products = await prisma.product.findMany();
    console.log("Fetched products:", products);
    return products;
  } catch (error) {
    console.error("Error fetching products from database:", error);
    throw error;
  }
} 

getAllProducts()