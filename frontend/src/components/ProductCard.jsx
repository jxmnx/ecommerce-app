import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import cartService from "../services/cartService";

function ProductCard({ product }) {

  const { setCart } =
    useContext(CartContext);

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
    <div className="product-card">

      <h3>{product.name}</h3>

      <p>{product.description}</p>

      <h2>₹{product.price}</h2>

      <span>{product.category}</span>

      <button
        onClick={handleAddToCart}
      >
        Add To Cart
      </button>

    </div>
  );
}

export default ProductCard;