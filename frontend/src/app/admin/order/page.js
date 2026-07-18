"use client";

import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/order");
        setOrders(response.data.orders);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  const handleOrder = (id) => {
    router.push(`/admin/order/${id}`);
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Orders</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-3">Order ID</th>
              <th className="border p-3">Customer</th>
              <th className="border p-3">Amount</th>
              <th className="border p-3">Status</th>
              <th className="border p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="border p-3 text-center">{order.id}</td>
                <td className="border p-3">{order.customerName}</td>
                <td className="border p-3">₹{order.totalAmount}</td>
                <td className="border p-3">
                  <span
                    className={`px-3 py-1 rounded text-white
                    ${
                      order.status === "PENDING"
                        ? "bg-yellow-500"
                        : order.status === "SHIPPED"
                          ? "bg-blue-500"
                          : "bg-green-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td onClick={() => handleOrder(order.id)} className="border p-3 cursor-pointer hover:underline">View</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
