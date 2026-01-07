import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";

function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState("Inactive");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axiosClient.get("/categories");
        const cat = res.data.find((c) => c.id === Number(id));
        if (!cat) return navigate("/category");
        setName(cat.name);
        setImageUrl(cat.imageUrl);
        setStatus(cat.status);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosClient.put(`/categories/${id}`, { name, imageUrl, status });
    navigate("/category");
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Edit Category</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg border max-w-xl"
      >
        <div className="mb-4">
          <label className="block text-sm mb-1">Category Name</label>
          <input
            className="w-full border rounded px-3 py-2 text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Image URL</label>
          <input
            className="w-full border rounded px-3 py-2 text-sm"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <div className="mb-6">
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
            onClick={() => navigate("/category")}
            className="px-4 py-2 rounded-md border text-sm"
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
  );
}

export default EditCategory;
