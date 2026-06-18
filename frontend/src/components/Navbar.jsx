import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar({ darkMode, toggleTheme }) {

  const { cart } = useContext(CartContext);

  const {
    user,
    logoutUser
  } = useAuth();

  const cartCount =
    cart?.items?.length || 0;

  return (
    <nav className="navbar">

      <h2 className="logo">
        Shop<span>Sphere</span>
      </h2>

      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/cart">
          Cart ({cartCount})
        </Link>
        {user && (
  <Link to="/profile">
    Profile
  </Link>
)}

        {user && (
          <Link to="/orders">
            Orders
          </Link>
        )}

        {!user ? (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </>
        ) : (
          <>
            <span>
              Hi, {user.name}
            </span>

            <button
              className="logout-btn"
              onClick={logoutUser}
            >
              Logout
            </button>
          </>
        )}

        <button
          className="theme-btn"
          onClick={toggleTheme}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

      </div>

    </nav>
  );
}

export default Navbar;