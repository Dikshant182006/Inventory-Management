// Add new product form

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface ProductFormData {
  name: string;
  price: number | string;
  category: string;
  sku: string;
  image: string;
  description: string;
}

export default function CreateProductPage() {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: "",
    category: "",
    sku: "",
    image: "",
    description: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/product",
        formData,
      );

      router.push("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = async (e) => {
    setFormData({
      name: "",
      price: "",
      category: "",
      sku: "",
      image: "",
      description: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 px-8 py-6">
          <h1 className="text-3xl font-bold text-white">Add New Product</h1>
          <p className="text-blue-100 mt-1">
            Fill in the product details below.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Image */}
            {formData.image && (
              <div className="mt-4">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-lg border"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )}

            {/* Product Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={handleChange}
                name="price"
                placeholder="₹ 0.00"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                name="category"
                onChange={handleChange}
                className="w-full border rounded-lg px-2 py-3 bg-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option>Select Category</option>
                <option>Electronics</option>
                <option>Fashion</option>
                <option>Furniture</option>
                <option>Books</option>
                <option>Sports</option>
              </select>
            </div>

            {/* SKU */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                SKU
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                placeholder="e.g. ELEC-001"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Image URL(Optional)
              </label>
              <input
                name="image"
                onChange={handleChange}
                value={formData.image}
                type="text"
                placeholder="https://example.com/product-image.jpg"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description(Optional)
              </label>
              <textarea
                value={formData.description}
                onChange={handleChange}
                name="description"
                rows={5}
                placeholder="Write product description..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
              ></textarea>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="reset"
              onClick={handleReset}
              className="px-6 cursor-pointer py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Reset
            </button>

            <button
              type="submit"
              className="px-8 py-3 rounded-lg cursor-pointer bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
