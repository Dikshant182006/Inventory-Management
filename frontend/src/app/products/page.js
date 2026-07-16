// Show all products

"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductsPage() {
  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    try{
      const response = await axios.get('http://localhost:3000/api/product'        
      );
      
      setProducts(response.data.products);
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  return (
    <div className="p-6 m-5">
      <h1 className="text-3xl font-bold">All Products</h1>

      <div className="flex flex-wrap gap-5">
        {products.map((product) => {
        return <div key={product.id} className="border-2 w-[33vw] p-5 text-xl mt-5 rounded-2xl cursor-pointer">
          <h2 className="font-bold text-2xl">Headphones</h2>
          <p>Price: {product.price}</p>
          { product.category && <p>Category: {product.category}</p> }
          <p>SKU: {product.sku}</p>
          <p className="text-lg text-gray-700">{product.description}</p>
        </div>
        })}
      </div>
    </div>
  );
}
