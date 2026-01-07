function Topbar() {
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-[#62257e]">
      <span className="text-white text-sm font-medium"></span>

      <button className="h-9 w-9 rounded-full border border-white/70 flex items-center justify-center text-white">
        {/* user icon placeholder */}
        <span className="text-lg">👤</span>
      </button>
    </header>
  );
}

export default Topbar;
