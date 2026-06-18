import Navbar from "../../components/Navbar";
import { useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {

  const [darkMode, setDarkMode] =
    useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={
        darkMode
          ? "dark"
          : "light"
      }
    >

      <Navbar
        darkMode={darkMode}
        toggleTheme={toggleTheme}
      />

      <div
        style={{
          padding: "50px"
        }}
      >

        <h1>
          Admin Dashboard
        </h1>

        <div
          className="products-grid"
        >

          <Link
            to="/admin/products"
            className="product-card"
            style={{
              textDecoration:
                "none",
              color:
                "inherit"
            }}
          >
            <h2>
              Manage Products
            </h2>

            <p>
              Add, edit and
              delete products
            </p>
          </Link>

          <Link
            to="/admin/orders"
            className="product-card"
            style={{
              textDecoration:
                "none",
              color:
                "inherit"
            }}
          >
            <h2>
              Manage Orders
            </h2>

            <p>
              View and update
              order status
            </p>
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;