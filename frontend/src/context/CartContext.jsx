import {
  createContext,
  useState,
  useEffect
} from "react";

import cartService
  from "../services/cartService";

export const CartContext =
  createContext();

export const CartProvider =
  ({ children }) => {

  const [cart, setCart] =
    useState({
      items: []
    });

  useEffect(() => {

    const fetchCart =
      async () => {

      const user =
        JSON.parse(
          localStorage.getItem(
            "user"
          )
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

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};