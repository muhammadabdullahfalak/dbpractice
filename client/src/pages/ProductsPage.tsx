// // src/pages/ProductsPage.tsx
// import { useEffect, useState } from "react";
// import axios from "axios";

// type Product = {
//   id: number;
//   name: string;
//   price: number;
//   categoryId: number;
// };

// export default function ProductsPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState<number>(0);
//   const [categoryId, setCategoryId] = useState<number>(0);

//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products`);
//       const data = res.data;
//       if (Array.isArray(data)) {
//         setProducts(data as Product[]);
//       } else {
//         console.warn("Products data is not an array:", data);
//         setProducts([]);
//       }
//     } catch (error) {
//       console.error("Failed to fetch products:", error);
//       setProducts([]);
//     }
//   };

//   const addProduct = async () => {
//     try {
//       await axios.post(`${import.meta.env.VITE_API_BASE_URL}/products`, {
//         name,
//         price,
//         categoryId,
//       });
//       setName("");
//       setPrice(0);
//       setCategoryId(0);
//       fetchProducts();
//     } catch (error) {
//       console.error("Failed to add product:", error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-2">Products</h2>
//       <input
//         type="text"
//         placeholder="Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         className="border p-1 mr-2"
//       />
//       <input
//         type="number"
//         placeholder="Price"
//         value={price}
//         onChange={(e) => setPrice(Number(e.target.value))}
//         className="border p-1 mr-2"
//       />
//       <input
//         type="number"
//         placeholder="Category ID"
//         value={categoryId}
//         onChange={(e) => setCategoryId(Number(e.target.value))}
//         className="border p-1 mr-2"
//       />
//       <button
//         onClick={addProduct}
//         className="bg-blue-500 text-white px-3 py-1 rounded"
//       >
//         Add
//       </button>

//       <ul className="mt-4">
//         {Array.isArray(products) && products.length > 0 ? (
//           products.map((prod) => (
//             <li key={prod.id} className="py-1">
//               {prod.name} - ${prod.price}
//             </li>
//           ))
//         ) : (
//           <li className="text-gray-500">No products found.</li>
//         )}
//       </ul>
//     </div>
//   );
// }

// src/pages/ProductsPage.tsx
import { useEffect, useState } from "react";
import axios from "axios";

type Product = {
  id: number;
  name: string;
  price: number;
  categoryId: number;
};

type Category = {
  id: number;
  name: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<number>(0);

  const fetchProducts = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products`);
    setProducts(res.data as Product[]);
  };

  const fetchCategories = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/categories`);
    setCategories(res.data as Category[]);
  };

  const addProduct = async () => {
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/products`, {
      name,
      price,
      categoryId,
    });
    setName("");
    setPrice(0);
    setCategoryId(0);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Products</h2>

      <div className="mb-4 space-x-2">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-1"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="border p-1"
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          className="border p-1"
        >
          <option value={0}>Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button onClick={addProduct} className="bg-blue-500 text-white px-3 py-1 rounded">
          Add
        </button>
      </div>

      <ul className="mt-4">
        {products.map((prod) => (
          <li key={prod.id} className="py-1">
            {prod.name} - ${prod.price} (Category ID: {prod.categoryId})
          </li>
        ))}
      </ul>
    </div>
  );
}
