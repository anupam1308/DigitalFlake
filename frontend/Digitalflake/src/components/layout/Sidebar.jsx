import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="h-full border-r border-[#e4e4e4] flex flex-col bg-[#f5f3f3]">
      {/* Logo row */}
      <div className="h-16 flex items-center px-5 bg-[#62257e] border-b border-[#62257e]">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-md bg-white flex items-center justify-center text-[#62257e] text-2xl font-semibold">
            D
          </div>
          <span className="text-2xl font-semibold text-white">
            digitalflake
          </span>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 text-base">
        {/* Home (active) */}
        <button
          onClick={() => navigate("/home")}
          className="w-full flex items-center justify-between px-6 py-3 bg-[#f7eb9c] text-[#242424]"
        >
          <span className="flex items-center gap-4">
            <span className="h-5 w-5 border-2 border-gray-600 rounded-sm" />
            <span className="font-medium">Home</span>
          </span>
          <span className="text-5xl text-gray-600">▶</span>
        </button>

        {/* Category */}
        <button
          onClick={() => navigate("/category")}
          className="w-full flex items-center justify-between px-6 py-3 hover:bg-gray-200 text-[#555]"
        >
          <span className="flex items-center gap-4">
            <span className="h-5 w-5 border-2 border-gray-600 rounded-sm" />
            <span className="font-medium">Category</span>
          </span>
          <span className="text-5xl text-gray-600">▶</span>
        </button>

        {/* Subcategory */}
        <button
          onClick={() => navigate("/subcategory")}
          className="w-full flex items-center justify-between px-6 py-3 hover:bg-gray-200 text-[#555]"
        >
          <span className="flex items-center gap-4">
            <span className="h-5 w-5 border-2 border-gray-600 rounded-sm" />
            <span className="font-medium">Subcategory</span>
          </span>
          <span className="text-5xl text-gray-600">▶</span>
        </button>

        {/* Products */}
        <button
          onClick={() => navigate("/products")}
          className="w-full flex items-center justify-between px-6 py-3 hover:bg-gray-200 text-[#555]"
        >
          <span className="flex items-center gap-4">
            <span className="h-5 w-5 border-2 border-gray-600 rounded-sm" />
            <span className="font-medium">Products</span>
          </span>
          <span className="text-5xl text-gray-600">▶</span>
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
