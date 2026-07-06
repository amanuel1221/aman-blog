import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

const pageTitles = {
  dashboard: "Overview Dashboard",
  posts: "Content Studio",
  messages: "Communications Inbox",
  analytics: "Analytics & Trends",
  settings: "System Settings",
};

const AdminLayout = () => {
  const location = useLocation();
  const routeKey = location.pathname.split("/")[2] || "dashboard";
  const pageTitle = pageTitles[routeKey] || "Control Panel";

  // Keeps the browser tab title in sync with the current active view
  useEffect(() => {
    document.title = `Admin | ${pageTitle}`;
  }, [pageTitle]);

  return (
    <div data-testid="admin-layout-root" className="flex min-h-screen bg-slate-50 overflow-x-hidden antialiased">
      
      {/* Platform Navigation Rails */}
      <Sidebar />

      {/* Primary Application Body Viewport */}
      <main 
        data-testid="admin-main-content" 
        role="main" 
        className="flex-1 min-h-screen lg:ml-64 transition-all duration-300 ease-in-out flex flex-col"
      >
        {/* Invisible descriptive heading for clear screen-reader accessibility landmarks */}
        <h2 className="sr-only">{pageTitle} Workspace Section</h2>

        {/* Nested Route View Port Frame */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;