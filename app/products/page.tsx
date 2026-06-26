// app/page.tsx
import { getAllProducts } from "../product-db";

export default async function Page() {
  const products = await getAllProducts();
  
  return (
    <main className="p-8">
      <h1 className="text-xl font-bold mb-4">Store Inventory</h1>
      <div className="space-y-2">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow-sm">
            <h2 className="font-semibold">{product.title}</h2>
            <p className="text-gray-600">${product.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}