import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import cartService from "../services/cartService";

function ProductCard({ product }) {

  const { setCart } =
    useContext(CartContext);
   const navigate = useNavigate(); 

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
    <img
  src={product.image}
  alt={product.name}
  style={{
    width: "100%",
    height: "220px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "15px"
  }}
/>    

      <h3
  style={{
    cursor: "pointer"
  }}
  onClick={() =>
    navigate(
      `/product/${product._id}`
    )
  }
>
  {product.name}
</h3>

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