import { Route, Routes, NavLink } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import CategoriesPage from "./pages/CategoriesPage";
import OrdersPage from "./pages/OrdersPage";

export default function App() {
  return (
    <div className="p-4">
      <nav className="mb-4 space-x-4">
        <NavLink to="/products" className="text-blue-600 hover:underline">Products</NavLink>
        <NavLink to="/categories" className="text-blue-600 hover:underline">Categories</NavLink>
        <NavLink to="/orders" className="text-blue-600 hover:underline">Orders</NavLink>
      </nav>

      <Routes>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
    </div>
  );
}
