"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    customerName: "",
    productId: "",
    quantity: "",
    price: "",
    totalAmount: "",
    status: "PENDING",
  });

  const [recentOrder, setRecentOrder] = useState([]);
  const [dashboard, setDashboard] = useState({});
  const [products, setProducts] = useState([]);

  const getdetails = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/dashboard");

      setDashboard(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/order", {
        customerName: formData.customerName,
        productId: Number(formData.productId),
        quantity: Number(formData.quantity),
        price: Number(formData.price),
        totalAmount: Number(formData.totalAmount),
        status: formData.status,
      });

      console.log(response.data);

      // update recent orders
      fetchOrderHistory();

      // update dashboard cards
      getdetails();

      alert("Order Created Successfully");

      // reset form
      setFormData({
        customerName: "",
        productId: "",
        quantity: "",
        price: "",
        totalAmount: "",
        status: "PENDING",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrderHistory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/order/history",
      );

      setRecentOrder(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/product");

      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    getdetails();
    fetchOrderHistory();
    getProducts();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* NAVBAR */}

      <nav className="flex justify-between items-center bg-zinc-900 p-5 rounded-lg mb-8">
        <h1 className="text-2xl font-bold">Inventory Management</h1>

        <div className="flex gap-4">
          <button
            onClick={() => router.push("/admin/products/create")}
            className="bg-blue-600 px-5 py-2 rounded-lg font-bold cursor-pointer"
          >
            Add Product
          </button>

          <button
            onClick={() => router.push("/admin/stocks/add")}
            className="bg-green-600 px-5 py-2 rounded-lg font-bold cursor-pointer"
          >
            Add Stock
          </button>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT SIDE */}

        <div>
          <h1 className="text-4xl font-bold mb-10">Dashboard</h1>

          {/* CARDS */}

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-zinc-900 p-6 rounded-lg">
              <p>Total Products</p>

              <h2 className="text-3xl font-bold">{dashboard.totalProducts}</h2>
            </div>

            <div className="bg-zinc-900 p-6 rounded-lg">
              <p>Total Stock</p>

              <h2 className="text-3xl font-bold">{dashboard.stock}</h2>
            </div>

            <div className="bg-zinc-900 p-6 rounded-lg">
              <p>Total Orders</p>

              <h2 className="text-3xl font-bold">{dashboard.totalOrders}</h2>
            </div>

            <div className="bg-zinc-900 p-6 rounded-lg">
              <p>Pending Orders</p>

              <h2 className="text-3xl font-bold text-yellow-500">
                {dashboard.pendingOrder}
              </h2>
            </div>
          </div>

          {/* RECENT ORDERS */}

          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-5">Recent Orders</h2>

            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left p-3">Order ID</th>

                  <th className="text-left p-3">Customer</th>

                  <th className="text-left p-3">Amount</th>

                  <th className="text-left p-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {recentOrder.map((order) => (
                  <tr key={order.id} className="border-b border-gray-800">
                    <td className="p-3">{order.id}</td>

                    <td className="p-3">{order.customerName}</td>

                    <td className="p-3">₹{order.totalAmount}</td>

                    <td className="p-3">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT SIDE ADD ORDER */}

        <div className="bg-zinc-900 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-6">Add Order</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="Customer Name"
              className="w-full bg-black border border-gray-700 p-3 rounded"
            />

            <select
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              className="w-full bg-black border border-gray-700 p-3 rounded"
            >
              <option value="">Select Product</option>

              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>

            <input
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Quantity"
              type="number"
              className="w-full bg-black border border-gray-700 p-3 rounded"
            />

            <input
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              type="number"
              className="w-full bg-black border border-gray-700 p-3 rounded"
            />

            <input
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleChange}
              placeholder="Total Amount"
              type="number"
              className="w-full bg-black border border-gray-700 p-3 rounded"
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full bg-black border border-gray-700 p-3 rounded"
            >
              <option value="PENDING">PENDING</option>

              <option value="SHIPPED">SHIPPED</option>

              <option value="DELIVERED">DELIVERED</option>
            </select>

            <button
              type="submit"
              className="w-full bg-blue-600 p-3 rounded font-bold cursor-pointer"
            >
              Add Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
