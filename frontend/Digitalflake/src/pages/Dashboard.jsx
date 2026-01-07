import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar.jsx";
import Topbar from "../components/layout/Topbar.jsx";

function Dashboard() {
  return (
    <div className="min-h-screen bg-white flex">
      
      <div className="w-[400px] bg-[#f5f3f3]">
        <Sidebar />
      </div>

      
      <div className="flex-1 flex flex-col bg-white">
        <Topbar />

        
        <main className="flex-1 bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
