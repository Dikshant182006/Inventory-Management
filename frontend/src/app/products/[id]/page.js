"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function ProductDetailsPage() {
  const [product, setProduct] = useState(null);

  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/product/${id}`
      );

      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-10">
      <button
        onClick={() => router.back()}
        className="mb-8 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
      >
        ← Back
      </button>

      <div className="max-w-5xl mx-auto bg-gray-900 rounded-2xl shadow-xl p-8 flex flex-col md:flex-row gap-10">

        {/* Image */}
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-80 h-80 object-cover rounded-xl"
          />
        </div>

        {/* Details */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-6">
            {product.name}
          </h1>

          <p className="text-2xl text-green-400 font-semibold mb-4">
            ₹ {product.price}
          </p>

          <p className="mb-3">
            <span className="font-semibold">Category:</span>{" "}
            {product.category}
          </p>

          <p className="mb-3">
            <span className="font-semibold">SKU:</span>{" "}
            {product.sku}
          </p>

          <p className="mt-6 text-gray-300 leading-7">
            {product.description}
          </p>
        </div>

      </div>
    </div>
  );
}