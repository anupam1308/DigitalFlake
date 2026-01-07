import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";

function EditSubcategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState("Inactive");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [catsRes, subsRes] = await Promise.all([
          axiosClient.get("/categories"),
          axiosClient.get("/subcategories"),
        ]);

        setCategories(catsRes.data);

        const sub = subsRes.data.find((s) => s.id === Number(id));
        if (!sub) {
          navigate("/subcategory");
          return;
        }

        setName(sub.name);
        setCategoryId(sub.categoryId);
        setStatus(sub.status);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = "/images/subcategories/default.jpg";
    if (name.toLowerCase().includes("phone")) {
      imageUrl = "/images/subcategories/smartphones.jpg";
    } else if (name.toLowerCase().includes("laptop")) {
      imageUrl = "/images/subcategories/gaming-laptops.jpg";
    }

    await axiosClient.put(`/subcategories/${id}`, {
      name,
      categoryId,
      imageUrl,
      status,
    });

    navigate("/subcategory");
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="max-w-xl ml-4 mr-auto border rounded-lg p-6">
        <h1 className="text-xl font-semibold mb-4">Edit Subcategory</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Subcategory Name</label>
            <input
              className="w-full border rounded px-3 py-2 text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Category</label>
            <select
              className="w-full border rounded px-3 py-2 text-sm"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Status</label>
            <select
              className="w-48 border rounded px-3 py-2 text-sm"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 rounded-md border text-sm"
              onClick={() => navigate("/subcategory")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-[#62257e] text-white text-sm"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditSubcategory;
