import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";

import Navbar from "../components/Navbar";

import { CartContext }
from "../context/CartContext";

import cartService
from "../services/cartService";

function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] =
    useState(null);
    const { setCart } =
  useContext(CartContext);
    const [darkMode, setDarkMode] =
  useState(false);

const toggleTheme = () => {
  setDarkMode(!darkMode);
};

  useEffect(() => {

    const fetchProduct =
      async () => {

      try {

        const response =
          await fetch(
            `${process.env.REACT_APP_API_URL}/api/products/${id}`
          );

        const data =
          await response.json();

        setProduct(data);

      } catch (error) {

        console.log(error);
      }
    };

    fetchProduct();

  }, [id]);

  if (!product) {
    return <h2>Loading...</h2>;
  }
const handleAddToCart =
  async () => {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  if (!user) {
    alert("Please login first");
    return;
  }

  try {

    const cart =
      await cartService.addToCart(
        product._id,
        1,
        user.token
      );

    setCart(cart);

    alert("Added to cart");

  } catch (error) {

    console.log(error);

    alert("Failed to add");
  }
};

  return (
  <div className={darkMode ? "dark" : "light"}>

    <Navbar
      darkMode={darkMode}
      toggleTheme={toggleTheme}
    />

    <div
      style={{
        padding: "40px"
      }}
    >
<img
  src={product.image}
  alt={product.name}
  style={{
    width: "400px",
    maxWidth: "100%",
    borderRadius: "12px",
    marginBottom: "20px"
  }}
/>

      <h1>
        {product.name}
      </h1>

      <p>
        {product.description}
      </p>

      <h2>
        ₹{product.price}
      </h2>

      <p>
        Category:
        {" "}
        {product.category}
      </p>

      <p>
        Stock:
        {" "}
        {product.stock}
      </p>
<button
  className="shop-btn"
  onClick={handleAddToCart}
>
  Add To Cart
</button>
    </div>
    </div>
  );
}

export default ProductDetails;
