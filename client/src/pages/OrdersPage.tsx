// src/pages/OrdersPage.tsx
import { useEffect, useState } from "react";
import axios from "axios";

type Order = {
  id: number;
  quantity: number;
  productId: number;
  userId: number;
  createdAt: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [productId, setProductId] = useState<number>(0);
  const [userId, setUserId] = useState<number>(1); // Assuming dummy userId for now

  const fetchOrders = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/orders`);
    setOrders(res.data as Order[]);
  };

  const addOrder = async () => {
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/orders`, {
      quantity,
      productId,
      userId,
    });
    setQuantity(1);
    setProductId(0);
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Orders</h2>
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="border p-1 mr-2"
      />
      <input
        type="number"
        placeholder="Product ID"
        value={productId}
        onChange={(e) => setProductId(Number(e.target.value))}
        className="border p-1 mr-2"
      />
      <input
        type="number"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(Number(e.target.value))}
        className="border p-1 mr-2"
      />
      <button onClick={addOrder} className="bg-blue-500 text-white px-3 py-1 rounded">
        Add
      </button>

      <ul className="mt-4">
        {orders.map((order) => (
          <li key={order.id} className="py-1">
            Product ID: {order.productId} | Qty: {order.quantity} | User: {order.userId}
          </li>
        ))}
      </ul>
    </div>
  );
}
