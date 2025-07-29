// src/pages/OrdersPage.tsx
import { useEffect, useState } from "react";
import axios from "axios";

type Order = {
  id: number;
  productId: number;
  quantity: number;
  userId: number;
};

type Product = {
  id: number;
  name: string;
};

type User = {
  id: number;
  name: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [productId, setProductId] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [userId, setUserId] = useState<number>(0);

  const fetchOrders = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/orders`);
    setOrders(res.data as Order[]);
  };

  const fetchProducts = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products`);
    setProducts(res.data as Product[]);
  };

  const fetchUsers = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users`);
    setUsers(res.data as User[]);
  };

  const addOrder = async () => {
    if (!userId || !productId || quantity <= 0) return;

    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/orders`, {
      productId,
      quantity,
      userId,
    });

    setProductId(0);
    setQuantity(1);
    setUserId(0);
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
    fetchProducts();
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Orders</h2>

      <div className="mb-4 space-x-2">
        <select
          value={productId}
          onChange={(e) => setProductId(Number(e.target.value))}
          className="border p-1"
        >
          <option value={0}>Select Product</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border p-1"
        />

        <select
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
          className="border p-1"
        >
          <option value={0}>Select User</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>

        <button onClick={addOrder} className="bg-blue-500 text-white px-3 py-1 rounded">
          Add
        </button>
      </div>

      <ul className="mt-4">
        {orders.map((order) => (
          <li key={order.id} className="py-1">
            Product ID: {order.productId} – Qty: {order.quantity} – User ID: {order.userId}
          </li>
        ))}
      </ul>
    </div>
  );
}
