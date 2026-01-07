import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const res = await axiosClient.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this category?");
    if (!ok) return;

    try {
      await axiosClient.delete(`/categories/${id}`);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Failed to delete category", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return <div className="p-6">Loading categories...</div>;
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl ml-4 mr-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-6xl font-semibold">Category</h1>
          <button
            className="px-4 text-5xl py-2 rounded-md bg-[#62257e] text-white text-sm"
            onClick={() => navigate("/category/add")}
          >
            Add New
          </button>
        </div>

        <div className="border border-[#f0f0f0] rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#f7eb9c]">
              <tr>
                <th className="px-4 py-2 text-3xl text-left">Id</th>
                <th className="px-4 py-2 text-3xl text-left">Category name</th>
                <th className="px-4 py-2 text-3xl text-left">Image</th>
                <th className="px-4 py-2 text-3xl text-left">Status</th>
                <th className="px-4 py-2 text-3xl text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} className="border-t border-[#f0f0f0]">
                  <td className="px-4 text-2xl py-2">{cat.id}</td>
                  <td className="px-4 text-2xl py-2">{cat.name}</td>
                  <td className="px-4 text-2xl py-2">
                    {cat.imageUrl ? (
                      <img
                        src={cat.imageUrl}
                        alt={cat.name}
                        className="h-8 w-8 object-cover rounded"
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-4 text-2xl py-2">
                    <span
                      className={
                        cat.status === "Active"
                          ? "text-green-600"
                          : "text-red-500"
                      }
                    >
                      {cat.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-4xl space-x-3">
                    <button
                      className="text-xl text-[#62257e] underline"
                      onClick={() => navigate(`/category/${cat.id}/edit`)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-xl text-red-500 underline"
                      onClick={() => handleDelete(cat.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Category;
