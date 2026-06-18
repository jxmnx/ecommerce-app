const calculateTotal = (items) => {
  let total = 0;

  items.forEach((item) => {
    total += item.product.price * item.quantity;
  });

  return total;
};

module.exports = calculateTotal;