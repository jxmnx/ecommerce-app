import {
  useEffect,
  useState
} from "react";

import orderService
  from "../services/orderService";

function MyOrders() {

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {

    const fetchOrders =
      async () => {

      try {

        const user =
          JSON.parse(
            localStorage.getItem(
              "user"
            )
          );

        const data =
          await orderService.getMyOrders(
            user.token
          );

        setOrders(data);

      } catch (error) {

        console.log(error);
      }
    };

    fetchOrders();

  }, []);
const handleCancel =
  async (orderId) => {

  try {

    const user =
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      );

    const updatedOrder =
      await orderService.cancelOrder(
        orderId,
        user.token
      );

    setOrders(
      orders.map(order =>
        order._id === orderId
          ? updatedOrder
          : order
      )
    );

    alert(
      "Order cancelled"
    );

  } catch (error) {

    console.log(error);

    alert(
      "Unable to cancel order"
    );
  }
};
  return (
    <div
      style={{
        padding:"40px"
      }}
    >
      <h1>My Orders</h1>

      {orders.map(order => (

        <div
          key={order._id}
          className="cart-item"
        >
          <h3>
            Order ID:
          </h3>

          <p>
            {order._id}
          </p>

          <p>
            Status:
            {" "}
            {order.status}
          </p>

          <h3>
  ₹
  {order.totalAmount}
</h3>

{order.status ===
  "Pending" && (
  <button
    className="remove-btn"
    onClick={() =>
      handleCancel(
        order._id
      )
    }
  >
    Cancel Order
  </button>
)}

        </div>

      ))}
    </div>
  );
}

export default MyOrders;