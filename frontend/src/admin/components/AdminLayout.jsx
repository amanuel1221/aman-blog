import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

const pageTitles = {
  dashboard: "Dashboard",
  posts: "Posts",
  messages: "Messages",
  analytics: "Analytics",
  settings: "Settings",
};

const AdminLayout = () => {
  const location = useLocation();
  const routeKey = location.pathname.split("/")[2] || "dashboard";
  const pageTitle = pageTitles[routeKey] || "Admin";

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main data-testid="admin-main-content" role="main" className="flex-1 min-h-screen lg:ml-64 transition-all duration-300">

        <div className="p-4 sm:p-6 lg:p-8 space-y-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
