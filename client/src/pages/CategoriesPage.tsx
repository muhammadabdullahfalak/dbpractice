// src/pages/CategoriesPage.tsx
import { useEffect, useState } from "react";
import axios from "axios";

type Category = {
  id: number;
  name: string;
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");

  const fetchCategories = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/categories`);
    setCategories(res.data as Category[]);
  };

  const addCategory = async () => {
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/categories`, { name });
    setName("");
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Categories</h2>
      <input
        type="text"
        placeholder="Category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-1 mr-2"
      />
      <button onClick={addCategory} className="bg-blue-500 text-white px-3 py-1 rounded">
        Add
      </button>

      <ul className="mt-4">
        {categories.map((cat) => (
          <li key={cat.id} className="py-1">
            {cat.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
