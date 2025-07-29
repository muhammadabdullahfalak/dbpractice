// src/pages/UsersPage.tsx
import { useEffect, useState } from "react";
import axios from "axios";

type User = {
  id: number;
  name: string;
  email: string
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users`);
      setUsers(res.data as User[]);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  const addUser = async () => {
    if (!name.trim()) return;
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users`, { name, email });
      setName("");
      setEmail("");
      fetchUsers();
    } catch (err) {
      console.error("Failed to add user:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Users</h2>

      <div className="mb-4 space-x-2">
        <input
          type="text"
          placeholder="Enter user name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-2/3"
        />
        <input
          type="email"
          placeholder="Enter user email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-2/3"
        />
        <button
          onClick={addUser}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add User
        </button>
      </div>

      <ul className="mt-4">
        {users.map((user) => (
          <li key={user.id} className="py-1 border-b">
            ID: {user.id}: {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
