import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddCategory from "./pages/AddCategory.jsx";
import Category from "./pages/Category.jsx";
import Subcategory from "./pages/Subcategory.jsx";
import Products from "./pages/Products.jsx";
import EditCategory from "./pages/EditCategory.jsx";
import AddSubcategory from "./pages/AddSubcategory.jsx";
import EditSubcategory from "./pages/EditSubcategory.jsx";
import AddProduct from "./pages/AddProduct";



function App() {
  return (
    <Routes>
      {/* public login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      {/* protected area layout */}
      <Route path="/" element={<Dashboard />}>
        <Route path="category" element={<Category />} />
        <Route path="category/add" element={<AddCategory />} />
        <Route path="category/:id/edit" element={<EditCategory />} />

        <Route path="subcategory" element={<Subcategory />} />
        <Route path="subcategory/add" element={<AddSubcategory />} />
        <Route path="subcategory/:id/edit" element={<EditSubcategory />} />

        <Route path="products" element={<Products />} />
        <Route path="/products/add" element={<AddProduct />} />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
