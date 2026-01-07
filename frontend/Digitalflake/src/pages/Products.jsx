import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const loadProducts = async () => {
    const res = await axiosClient.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    await axiosClient.delete(`/products/${id}`);
    loadProducts();
  };

  return (
    <div className="p-6">
      {/* header bar with title + search + Add New */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold">Product</h1>

        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search"
            className="border rounded-full px-4 py-1 text-sm w-64"
          />
          <button
            onClick={() => navigate("/products/add")}
            className="bg-[#62257e] text-white text-sm px-4 py-2 rounded-md"
          >
            Add New
          </button>
        </div>
      </div>

      {/* table */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-yellow-100 text-left">
              <th className="px-4 py-2 w-16">Id</th>
              <th className="px-4 py-2">Product name</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Sub Category</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2 w-24">Status</th>
              <th className="px-4 py-2 w-24 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, idx) => (
              <tr
                key={p.id}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-4 py-2">{p.id}</td>
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="h-8 w-12 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2">{p.subcategoryName}</td>
                <td className="px-4 py-2">{p.categoryName}</td>
                <td className="px-4 py-2">
                  <span
                    className={
                      p.status === "Active"
                        ? "text-green-600"
                        : "text-red-500"
                    }
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center justify-center space-x-3">
                    <button
                      onClick={() => navigate(`/products/${p.id}/edit`)}
                      className="text-gray-600 hover:text-[#62257e]"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-gray-600 hover:text-red-600"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
