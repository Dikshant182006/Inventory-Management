// Show all products

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/product");

      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleRoute = (id) => {
    router.push(`/admin/products/${id}`);
  }

  return (
    <div className="p-6 m-5">
      <h1 className="text-3xl font-bold">All Products</h1>

      <div className="flex flex-wrap gap-5">
        {products.map((product) => {
          return (
            <div
              key={product.id}
              className="border rounded-2xl p-5 mt-5 w-full max-w-4xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div onClick={() => handleRoute(product.id)} className="flex justify-between items-center gap-6 cursor-pointer">
                {/* Left Side */}
                <div className="flex-1">
                  <h2 className="font-bold text-3xl mb-2">{product.name}</h2>

                  <p className="text-lg mb-1">
                    <span className="font-semibold">Price:</span> ₹
                    {product.price}
                  </p>

                  {product.category && (
                    <p className="text-lg mb-1">
                      <span className="font-semibold">Category:</span>{" "}
                      {product.category}
                    </p>
                  )}

                  <p className="text-lg mb-1">
                    <span className="font-semibold">SKU:</span> {product.sku}
                  </p>

                  <p className="text-gray-400 mt-3">{product.description}</p>
                </div>

                {/* Right Side */}
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-40 h-40 object-cover rounded-xl"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
