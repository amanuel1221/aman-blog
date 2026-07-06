import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FiHome, FiFileText, FiMail, FiBarChart2, FiLogOut, FiMenu, FiX } from "react-icons/fi";

const menuItems = [
  {
    title: "Dashboard",
    icon: <FiHome size={18} />,
    path: "/admin/dashboard",
  },
  {
    title: "Posts",
    icon: <FiFileText size={18} />,
    path: "/admin/posts",
  },
  {
    title: "Messages",
    icon: <FiMail size={18} />,
    path: "/admin/messages",
  },
  {
    title: "Analytics",
    icon: <FiBarChart2 size={18} />,
    path: "/admin/analytics",
  },
];

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { admin, logoutAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate("/signin");
  };

  return (
    <>
      {/* Mobile Menu Trigger Handle */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-40 lg:hidden bg-white shadow-sm border border-slate-200 rounded-xl p-2.5 text-slate-600 hover:bg-slate-50 active:scale-95 transition-all"
        aria-label="Open admin menu"
      >
        <FiMenu size={20} />
      </button>

      {/* Dimmed Backdrop Blur for Mobile Drawer */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
        />
      )}

      {/* Primary Sidebar Rail */}
      <aside
        data-testid="admin-sidebar"
        className={`
          fixed top-0 left-0 h-screen w-72 lg:w-64 bg-white border-r border-slate-200/80
          z-50 flex flex-col justify-between overflow-y-auto transform transition-transform
          duration-300 ease-in-out select-none
          ${open ? "translate-x-0 shadow-xl" : "-translate-x-full"}
          lg:translate-x-0 lg:sticky lg:shadow-none
        `}
      >
        {/* Navigation & Header Body Container */}
        <div>
          {/* Workspace Branding Header */}
          <header className="px-6 py-5 border-b border-slate-100 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900">Aman Blog</h1>
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">Control Studio</p>
              </div>

              <button 
                type="button"
                onClick={() => setOpen(false)} 
                aria-label="Close admin menu" 
                className="lg:hidden p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Profile Identity Card */}
            <div className="rounded-xl bg-slate-50/70 border border-slate-100 p-3.5 space-y-1">
              <p className="text-sm font-bold text-slate-800 truncate">{admin?.name || "Administrator"}</p>
              <p className="text-xs text-slate-400 font-mono truncate">{admin?.email || "admin@amanblog.dev"}</p>
              <div className="pt-1.5 flex">
                <span className="inline-flex text-[9px] font-extrabold uppercase tracking-widest bg-blue-50 text-blue-600 px-2 py-0.5 rounded border border-blue-100">
                  {admin?.role || "Admin Engine"}
                </span>
              </div>
            </div>
          </header>

          {/* Navigational Anchor Rails */}
          <nav data-testid="admin-sidebar-nav" className="mt-6 px-3.5 space-y-1" aria-label="Admin navigation">
            {menuItems.map((item) => (
              <NavLink
                key={item.title}
                to={item.path}
                onClick={() => setOpen(false)}
                aria-label={`Go to ${item.title} admin section`}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm transition-all duration-150 group
                  ${isActive
                    ? "bg-blue-50 text-blue-600 font-bold border-l-4 border-blue-600 rounded-l-none pl-3 shadow-2xs"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className={isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600 transition-colors"}>
                      {item.icon}
                    </span>
                    <span className="tracking-tight">{item.title}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Workspace Session Termination Footer */}
        <footer className="p-4 border-t border-slate-100 bg-slate-50/30">
          <button
            type="button"
            data-testid="admin-logout-button"
            onClick={handleLogout}
            aria-label="Logout admin user session"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-red-100/60 bg-red-50 text-xs font-bold uppercase tracking-wider text-red-600 hover:bg-red-100/80 active:scale-[0.99] transition duration-150 cursor-pointer shadow-3xs"
          >
            <FiLogOut size={13} />
            Exit Studio
          </button>
        </footer>
      </aside>
    </>
  );
};

export default Sidebar;