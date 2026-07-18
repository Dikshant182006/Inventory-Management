"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function AddPage() {
  const [products, setProducts] = useState([]);
  const [formData, setformData] = useState({
    productId: "",
    quantity: "",
  });

  useEffect(() => {
    const handleProduct = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/product");

        setProducts(response.data.products);
      } catch (error) {
        console.log(error);
      }
    };

    handleProduct();
  }, []);

  const handleStock = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/stock",
        formData,
      );

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }

    setformData({
      quantity: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setformData({
      ...formData,
      [name]: name === "quantity" ? Number(value) : value,
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Add Stock</h1>

        {/* Product Select */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Select Product</label>
          <select
            name="productId"
            onChange={handleChange}
            className="w-full border p-2 rounded bg-black"
          >
            <option value="">Select Product</option>
            // Maping in products
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Quantity</label>

          <input
            type="number"
            value={formData.quantity}
            name="quantity"
            onChange={handleChange}
            placeholder="Enter quantity"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleStock}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Add Stock
        </button>
      </div>
    </div>
  );
}
