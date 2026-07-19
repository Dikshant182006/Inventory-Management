"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/history");

      setHistory(response.data.history);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Inventory History</h1>

      <div className="bg-zinc-900 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-zinc-800">
            <tr>
              <th className="text-left p-4">Product</th>
              <th className="text-left p-4">Action</th>
              <th className="text-left p-4">Quantity</th>
              <th className="text-left p-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {history.map((item) => (
              <tr
                key={item.id}
                className="border-b border-zinc-700 hover:bg-zinc-800"
              >
                <td className="p-4">{item.productName}</td>

                <td className="p-4">
                  {item.type === "ADD_STOCK" && (
                    <span className="text-green-500 font-semibold">
                      Add Stock
                    </span>
                  )}

                  {item.type === "REMOVE_STOCK" && (
                    <span className="text-red-500 font-semibold">
                      Remove Stock
                    </span>
                  )}

                  {item.type === "ORDER_CREATED" && (
                    <span className="text-blue-500 font-semibold">
                      Order Created
                    </span>
                  )}
                </td>

                <td
                  className={`p-4 font-bold ${
                    item.type === "ADD_STOCK"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {item.type === "ADD_STOCK"
                    ? `+${item.quantity}`
                    : `-${item.quantity}`}
                </td>

                <td className="p-4">
                  {new Date(item.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {history.length === 0 && (
          <div className="text-center py-8 text-gray-400">No history found</div>
        )}
      </div>
    </div>
  );
}
