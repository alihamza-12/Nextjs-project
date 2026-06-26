import "dotenv/config";
// Import the single, configured prisma instance
import prisma from "../lib/prisma"; 

async function main() {
  const count = await prisma.product.count();

  if (count === 0) {
    await prisma.product.createMany({
      data: [
        { title: "Product 1", price: 500, description: "Description 1" },
        { title: "Product 2", price: 700, description: "Description 2" },
        { title: "Product 3", price: 1000, description: "Description 3" },
      ],
    });

    console.log("Seeded products ✅");
  } else {
    console.log("Already exists");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });