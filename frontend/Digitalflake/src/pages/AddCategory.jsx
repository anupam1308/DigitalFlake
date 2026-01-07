import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

function AddCategory() {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState("Inactive");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosClient.post("/categories", { name, imageUrl, status });
    navigate("/category");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Add Category</h1>

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
            placeholder="/images/categories/mobile.jpg"
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

export default AddCategory;
