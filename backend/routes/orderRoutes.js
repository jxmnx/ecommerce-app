const express =
  require("express");

const router =
  express.Router();

const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  cancelOrder
} = require(
  "../controllers/orderController"
);

const {
  protect
} = require(
  "../middleware/authMiddleware"
);

const {
  admin
} = require(
  "../middleware/adminMiddleware"
);

router.post(
  "/",
  protect,
  placeOrder
);

router.get(
  "/my-orders",
  protect,
  getMyOrders
);

/* ADD THIS HERE */
router.put(
  "/:id/cancel",
  protect,
  cancelOrder
);

router.get(
  "/",
  protect,
  admin,
  getAllOrders
);

router.put(
  "/:id/status",
  protect,
  admin,
  updateOrderStatus
);

module.exports =
  router;