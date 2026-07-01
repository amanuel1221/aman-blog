import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import {
  FiHome,
  FiFileText,
  FiMail,
  FiBarChart2,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";

const menuItems = [
  {
    title: "Dashboard",
    icon: <FiHome size={20} />,
    path: "/admin/dashboard",
  },
  {
    title: "Posts",
    icon: <FiFileText size={20} />,
    path: "/admin/posts",
  },
  {
    title: "Messages",
    icon: <FiMail size={20} />,
    path: "/admin/messages",
  },
  {
    title: "Analytics",
    icon: <FiBarChart2 size={20} />,
    path: "/admin/analytics",
  },
];

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { admin, logoutAdmin } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate("/signin");
  };

  return (
    <>
      {/* ================= Mobile Menu Button ================= */}

      <button
        onClick={() => setOpen(true)}
        className="fixed top-5 left-5 z-50 lg:hidden bg-white shadow-md rounded-xl p-2"
        aria-label="Open admin menu"
      >
        <FiMenu size={22} />
      </button>

      {/* ================= Overlay ================= */}

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* ================= Sidebar ================= */}

      <aside
        data-testid="admin-sidebar"
        className={`
        fixed
        top-0
        left-0
        h-screen
        w-80
        sm:w-72
        lg:w-64
        bg-white
        border-r
        shadow-sm
        z-50
        overflow-y-auto
        transform
        transition-transform
        duration-300
        ease-in-out

        ${open ? "translate-x-0" : "-translate-x-full"}

        lg:translate-x-0
        lg:static
        lg:shadow-none
      `}
      >
        {/* ================= Header ================= */}

        <div className="px-6 py-5 border-b">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-blue-600">Aman Blog</h1>
              <p className="text-xs text-gray-500 mt-1">Admin Dashboard</p>
            </div>

            <button onClick={() => setOpen(false)} aria-label="Close admin menu" className="lg:hidden">
              <FiX size={22} />
            </button>
          </div>

          <div className="mt-5 rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
            <p className="font-semibold text-slate-800">{admin?.name || "Administrator"}</p>
            <p>{admin?.email || "admin@amanblog.dev"}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">{admin?.role || "Admin"}</p>
          </div>
        </div>

        {/* ================= Navigation ================= */}

        <nav data-testid="admin-sidebar-nav" className="mt-6 px-3" aria-label="Admin navigation">
          {menuItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              onClick={() => setOpen(false)}
              aria-label={`Go to ${item.title} admin section`}
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-4
                px-4
                py-3
                rounded-xl
                mb-2
                transition-all

                ${
                  isActive
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-600 hover:bg-slate-100 hover:text-blue-600"
                }
              `
              }
            >
              {item.icon}

              <span className="font-medium">
                {item.title}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* ================= Footer ================= */}

        <div className="absolute bottom-0 left-0 w-full border-t p-4">
          <button
            data-testid="admin-logout-button"
            onClick={handleLogout}
            aria-label="Logout admin user"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;