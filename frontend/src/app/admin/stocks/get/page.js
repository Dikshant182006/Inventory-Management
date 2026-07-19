"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function StockPage() {
  const [stocks, setStocks] = useState([]);

  const loadData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/stock");

      setStocks(response.data.stocks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRemove = async (stock) => {
    const quantity = prompt(
      `How much ${stock.product.name} stock do you want to remove?`,
    );

    if (!quantity) return;

    try {
      const response = await axios.delete(
        "http://localhost:3000/api/stock",
        {
          data: {
            productId: stock.productId,
            quantity: Number(quantity),
          },
        },
      );

      alert(response.data.message);

      // refresh table
      loadData();
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-5 text-center">All Stock</h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Product</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {stocks.map((stock) => (
            <tr className="text-center" key={stock.id}>
              <td className="border p-2">{stock.id}</td>

              <td className="border p-2">{stock.product.name}</td>

              <td className="border p-2">{stock.quantity}</td>

              <td>
                <button
                  onClick={() => handleRemove(stock)}
                  className="p-2 text-red-600 cursor-pointer"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
