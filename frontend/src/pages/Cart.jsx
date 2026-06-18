import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import cartService from "../services/cartService";
import orderService from "../services/orderService";
import Navbar from "../components/Navbar";

function Cart() {

  const navigate = useNavigate();

  const [cart, setCart] = useState({
    items: []
  });

  const [darkMode, setDarkMode] =
    useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {

    const fetchCart = async () => {

      const user =
        JSON.parse(
          localStorage.getItem("user")
        );

      if (!user) return;

      try {

        const data =
          await cartService.getCart(
            user.token
          );

        setCart(data);

      } catch (error) {

        console.log(error);
      }
    };

    fetchCart();

  }, []);

  const updateQuantity = async (
    productId,
    quantity
  ) => {

    if (quantity < 1) return;

    try {

      const user =
        JSON.parse(
          localStorage.getItem("user")
        );

      const updatedCart =
        await cartService.updateCartItem(
          productId,
          quantity,
          user.token
        );

      setCart(updatedCart);

    } catch (error) {

      console.log(error);
    }
  };

  const removeItem = async (
    productId
  ) => {

    try {

      const user =
        JSON.parse(
          localStorage.getItem("user")
        );

      const updatedCart =
        await cartService.removeCartItem(
          productId,
          user.token
        );

      setCart(updatedCart);

    } catch (error) {

      console.log(error);
    }
  };

  const checkout = async () => {

    try {

      const user =
        JSON.parse(
          localStorage.getItem("user")
        );

      await orderService.placeOrder(
        user.token
      );

      alert(
        "Order placed successfully!"
      );

      navigate("/orders");

    } catch (error) {

      console.log(error);

      alert(
        "Failed to place order"
      );
    }
  };

  const total =
    cart.items?.reduce(
      (sum, item) =>
        sum +
        item.product.price *
        item.quantity,
      0
    ) || 0;

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
          padding: "40px"
        }}
      >

        <h1>Your Cart</h1>

        {cart.items?.length === 0 ? (

          <p>Cart is empty</p>

        ) : (

          <>

            {cart.items.map(
              (item) => (

                <div
                  key={
                    item.product._id
                  }
                  className="cart-item"
                >

                  <h3>
                    {
                      item.product.name
                    }
                  </h3>

                  <p>
                    ₹
                    {
                      item.product.price
                    }
                  </p>

                  <div className="quantity-box">

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product._id,
                          item.quantity - 1
                        )
                      }
                    >
                      -
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product._id,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </button>

                  </div>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeItem(
                        item.product._id
                      )
                    }
                  >
                    Remove
                  </button>

                </div>

              )
            )}

            <h2>
              Total: ₹{total}
            </h2>

            <button
              className="shop-btn"
              onClick={checkout}
            >
              Proceed To Checkout
            </button>

          </>

        )}

      </div>

    </div>
  );
}

export default Cart;