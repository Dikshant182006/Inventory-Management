"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

interface Product {
  id: number;
  name: string;
}

interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  productId: number;
}

interface Order {
  id: number;
  customerName: string;
  totalAmount: number;
  status: "PENDING" | "SHIPPED" | "DELIVERED";
  orderItems: OrderItem[];
}

export default function OrderDetailsPage() {
  const { id } = useParams();
  const [orders, setOrders] = useState<Order | null>(null);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const response = await axios.get<Order>(
          `http://localhost:3000/api/order/${id}`,
        );

        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      getOrder();
    }
  }, [id]);

  if (!orders) {
    return <h1 className="p-8">Loading...</h1>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>

      <div className="border p-5 rounded">
        <p>
          <b>Order ID:</b> {orders.id}
        </p>
        <p>
          <b>Customer:</b> {orders.customerName}
        </p>
        <p>
          <b>Total Amount:</b> ₹{orders.totalAmount}
        </p>
        <p>
          <span
                    className={`px-3 py-1 rounded text-white
                    ${
                      orders.status === "PENDING"
                        ? "bg-yellow-500"
                        : orders.status === "SHIPPED"
                          ? "bg-blue-500"
                          : "bg-green-500"
                    }`}
                  >
                    {orders.status}
                  </span>
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Products</h2>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-3">Product</th>
            <th className="border p-3">Quantity</th>
            <th className="border p-3">Price</th>
          </tr>
        </thead>

        <tbody>
          {orders.orderItems.map((item) => (
            <tr key={item.id}>
              <td className="border p-3">{orders.customerName}</td>
              <td className="border p-3">{item.quantity}</td>
              <td className="border p-3">₹{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
