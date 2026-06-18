import axios from "axios";

const API =
  process.env.REACT_APP_API_URL;

const getCart = async (token) => {
  const res =
    await axios.get(
      `${API}/api/cart`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  return res.data;
};

const addToCart = async (
  productId,
  quantity,
  token
) => {
  const res =
    await axios.post(
      `${API}/api/cart/add`,
      {
        productId,
        quantity
      },
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  return res.data;
};
const removeCartItem = async (
  productId,
  token
) => {

  const res =
    await axios.delete(
      `${API}/api/cart/remove/${productId}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  return res.data;
};
const updateCartItem = async (
  productId,
  quantity,
  token
) => {

  const res =
    await axios.put(
      `${API}/api/cart/update`,
      {
        productId,
        quantity
      },
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  return res.data;
};
export default {
  getCart,
  addToCart,
  removeCartItem,
  updateCartItem
};