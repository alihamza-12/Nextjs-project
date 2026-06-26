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