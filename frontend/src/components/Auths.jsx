import { useAuth } from "../context/AuthContext";

const Auths = () => {
  const { user, logout } = useAuth();

  return (
    <nav>
      {user ? (
        <div className="flex items-center gap-4">
          <span>{user.name}</span>

          <button
            onClick={logout}
            className="px-4 py-2 rounded-lg bg-black text-white"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Signup</NavLink>
        </div>
      )}
    </nav>
  );
};

export default Auths;