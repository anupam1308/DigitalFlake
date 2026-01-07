import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

function Subcategory() {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchSubcategories = async () => {
    try {
      const res = await axiosClient.get("/subcategories");
      setSubcategories(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this subcategory?");
    if (!ok) return;

    try {
      await axiosClient.delete(`/subcategories/${id}`);
      setSubcategories((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Failed to delete subcategory", err);
    }
  };

  useEffect(() => {
    fetchSubcategories();
  }, []);

  if (loading) return <div className="p-6">Loading subcategories...</div>;

  return (
    <div className="p-6">
      <div className="max-w-6xl ml-4 mr-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Subcategory</h1>
          <button
            className="px-4 py-2 rounded-md bg-[#62257e] text-white text-sm"
            onClick={() => navigate("/subcategory/add")}
          >
            Add New
          </button>
        </div>

        <div className="border border-[#f0f0f0] rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#f7eb9c]">
              <tr>
                <th className="px-4 py-2 text-left">Id</th>
                <th className="px-4 py-2 text-left">Subcategory name</th>
                <th className="px-4 py-2 text-left">Category Id</th>
                <th className="px-4 py-2 text-left">Image</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {subcategories.map((sub) => (
                <tr key={sub.id} className="border-t border-[#f0f0f0]">
                  <td className="px-4 py-2">{sub.id}</td>
                  <td className="px-4 py-2">{sub.name}</td>
                  <td className="px-4 py-2">{sub.categoryId}</td>
                  <td className="px-4 py-2">
                    {sub.imageUrl ? (
                      <img
                        src={sub.imageUrl}
                        alt={sub.name}
                        className="h-8 w-8 object-cover rounded"
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={
                        sub.status === "Active"
                          ? "text-green-600"
                          : "text-red-500"
                      }
                    >
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 space-x-3">
                    <button
                      className="text-xs text-[#62257e] underline"
                      onClick={() => navigate(`/subcategory/${sub.id}/edit`)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-xs text-red-500 underline"
                      onClick={() => handleDelete(sub.id)}
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

export default Subcategory;
