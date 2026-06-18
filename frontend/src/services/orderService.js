import axios from "axios";

const API =
  process.env.REACT_APP_API_URL;

const placeOrder = async (
  token
) => {

  const res =
    await axios.post(
      `${API}/api/orders`,
      {},
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  return res.data;
};

const getMyOrders = async (
  token
) => {

  const res =
    await axios.get(
      `${API}/api/orders/my-orders`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  return res.data;
};
const cancelOrder =
  async (
    orderId,
    token
  ) => {

  const res =
    await axios.put(
      `${API}/api/orders/${orderId}/cancel`,
      {},
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
  placeOrder,
  getMyOrders,
  cancelOrder
};
