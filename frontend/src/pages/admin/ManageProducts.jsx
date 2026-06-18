import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";

import {
  getProducts,
  deleteProduct
} from "../../services/productService";

function ManageProducts() {

  const [products, setProducts] =
    useState([]);

  const [darkMode, setDarkMode] =
    useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {

    const fetchProducts =
      async () => {

      try {

        const data =
          await getProducts();

        setProducts(data);

      } catch (error) {

        console.log(error);
      }
    };

    fetchProducts();

  }, []);
const handleDelete =
  async (id) => {

  try {

    const user =
      JSON.parse(
        localStorage.getItem("user")
      );

    await deleteProduct(
      id,
      user.token
    );

    setProducts(
      products.filter(
        product =>
          product._id !== id
      )
    );

    alert(
      "Product deleted"
    );

  } catch (error) {

    console.log(error);

    alert(
      "Delete failed"
    );
  }
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
          Manage Products
        </h1>

        <div
          className="products-grid"
        >

          {products.map(
            product => (

              <div
                key={
                  product._id
                }
                className="product-card"
              >

                <h3>
                  {product.name}
                </h3>

                <p>
                  {
                    product.description
                  }
                </p>

                <h2>
                  ₹
                  {
                    product.price
                  }
                </h2>

                <p>
                  Stock:
                  {" "}
                  {
                    product.stock
                  }
                </p>

               <button
  className="remove-btn"
  onClick={() =>
    handleDelete(
      product._id
    )
  }
>
  Delete
</button>

              </div>

            )
          )}

        </div>

      </div>

    </div>
  );
}

export default ManageProducts;
