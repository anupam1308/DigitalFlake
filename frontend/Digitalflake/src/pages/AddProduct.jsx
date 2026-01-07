import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

function AddProduct() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [status, setStatus] = useState("Inactive");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const [catRes, subRes] = await Promise.all([
        axiosClient.get("/categories"),
        axiosClient.get("/subcategories"),
      ]);

      setCategories(catRes.data);
      setSubcategories(subRes.data);

      // set default selected category
      if (catRes.data.length && !categoryId) {
        setCategoryId(catRes.data[0].id);
      }
    };

    loadData();
  }, [categoryId]);

  // subcategories filtered by selected category
  const filteredSubs = subcategories.filter(
    (s) => String(s.categoryId) === String(categoryId)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = "/images/products/default.jpg";
    const lower = name.toLowerCase();

    if (lower.includes("motorola")) {
      imageUrl = "/images/products/motorola-edge.jpg";
    } else if (lower.includes("hp")) {
      imageUrl = "/images/products/hp-pavillion.jpg";
    } else if (lower.includes("apple")) {
      imageUrl = "/images/products/apple.jpg";
    }

    await axiosClient.post("/products", {
      name,
      categoryId,
      subcategoryId,
      imageUrl,
      status,
    });

    navigate("/products");
  };

  return (
    <div className="p-6">
      <div className="max-w-xl ml-4 mr-auto border rounded-lg p-6">
        <h1 className="text-xl font-semibold mb-4">Add Product</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product name */}
          <div>
            <label className="block text-sm mb-1">Product name</label>
            <input
              className="w-full border rounded px-3 py-2 text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm mb-1">Category</label>
            <select
              className="w-full border rounded px-3 py-2 text-sm bg-white text-black"
              value={categoryId}
              onChange={(e) => {
                setCategoryId(e.target.value);
                setSubcategoryId("");
              }}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} {/* Mobile, Laptop, Grocery from backend */}
                </option>
              ))}
            </select>
          </div>

          {/* Sub Category */}
          <div>
            <label className="block text-sm mb-1">Sub Category</label>
            <select
              className="w-full border rounded px-3 py-2 text-sm bg-white text-black"
              value={subcategoryId}
              onChange={(e) => setSubcategoryId(e.target.value)}
            >
              {filteredSubs.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} {/* e.g. Smartphones, Gaming Laptops, Vegetables */}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm mb-1">Status</label>
            <select
              className="w-48 border rounded px-3 py-2 text-sm bg-white text-black"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 rounded-md border text-sm"
              onClick={() => navigate("/products")}
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

export default AddProduct;
