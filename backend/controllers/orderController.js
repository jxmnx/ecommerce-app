const Order = require("../models/Order");
const Cart = require("../models/Cart");

exports.placeOrder = async (
  req,
  res
) => {
  try {

    const cart =
      await Cart.findOne({
        user: req.user._id
      }).populate(
        "items.product"
      );

    if (
      !cart ||
      cart.items.length === 0
    ) {
      return res.status(400).json({
        message:
          "Cart is empty"
      });
    }

    const orderItems =
      cart.items.map(item => ({
        product:
          item.product._id,
        quantity:
          item.quantity,
        price:
          item.product.price
      }));

    const totalAmount =
      cart.items.reduce(
        (total, item) =>
          total +
          item.product.price *
          item.quantity,
        0
      );

    const order =
      await Order.create({
        user:
          req.user._id,
        items:
          orderItems,
        totalAmount
      });

    cart.items = [];
    await cart.save();

    res.status(201).json(
      order
    );

  } catch (error) {
    res.status(500).json({
      message:
        error.message
    });
  }
};

exports.getMyOrders =
  async (req, res) => {
    try {

      const orders =
        await Order.find({
          user:
            req.user._id
        }).populate(
          "items.product"
        );

      res.json(orders);

    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };

exports.getAllOrders =
  async (req, res) => {
    try {

      const orders =
        await Order.find()
          .populate("user")
          .populate(
            "items.product"
          );

      res.json(orders);

    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };

exports.updateOrderStatus =
  async (req, res) => {
    try {

      const order =
        await Order.findById(
          req.params.id
        );

      if (!order) {
        return res
          .status(404)
          .json({
            message:
              "Order not found"
          });
      }

      order.status =
        req.body.status;

      await order.save();

      res.json(order);

    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };
  exports.cancelOrder =
  async (req, res) => {

  try {

    const order =
      await Order.findById(
        req.params.id
      );

    if (!order) {
      return res.status(404).json({
        message:
          "Order not found"
      });
    }

    if (
      order.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message:
          "Unauthorized"
      });
    }

    if (
      order.status !== "Pending"
    ) {
      return res.status(400).json({
        message:
          "Only pending orders can be cancelled"
      });
    }

    order.status =
      "Cancelled";

    await order.save();

    res.json(order);

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    });
  }
};