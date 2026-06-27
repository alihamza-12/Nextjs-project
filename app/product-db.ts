import prisma from "@/lib/prisma";

//For Fetching all products from DB
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
// getAllProducts()
//Fetch product from DB only throught id 
export async function getProductFromId(id:number) {
  try{
        const product =await prisma.product.findUnique({
            where : {
                id:id,
            }
        })
    console.log(`Fetched product with id ${id}:`, product);
    return product;

  }catch(error){
    console.error("Error fetching unique products from database:", error);
    throw error;}
}

// getProductFromId(2)


// Create a new product in the DB
export async function createProduct(title: string, price: number, description?: string) {
  try {
    const newProduct = await prisma.product.create({
      data: {
        title,
        price,
        description,
      },
    });

    console.log("Successfully created product ✅", newProduct);
    return newProduct;
  } catch (error) {
    console.error("Error inserting product into database:", error);
    throw error;
  }
}

//update product

export async function updateProduct(id: number, title: string, price: number, description?: string) {
  try {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        title,
        price,
        description,
      },
    });

    console.log("Successfully updated product ✅", updatedProduct);
    return updatedProduct;
  } catch (error) {
    console.error(`Error updating product with id ${id}:`, error);
    throw error;
  }
}


// Delete a product from the DB by its ID
export async function deleteProduct(id: number) {
  try {
    const deletedProduct = await prisma.product.delete({
      where: { id },
    });

    console.log("Successfully deleted product ❌", deletedProduct);
    return deletedProduct;
  } catch (error) {
    console.error(`Error deleting product with id ${id}:`, error);
    throw error;
  }
}