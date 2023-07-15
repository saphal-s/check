const express = require("express");
const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCouponToUserCart,
  createOrder,
  createcodOrder,
  orders,
  fetchUsers,
  readOrder,
} = require("../controllers/user");
const router = express.Router();
const { authCheck, adminCheck } = require("../middleware/auth");

router.get("/users", authCheck, adminCheck, fetchUsers);

router.post("/user/cart", authCheck, userCart);
router.get("/user/cart", authCheck, getUserCart);
router.delete("/user/cart", authCheck, emptyCart);

router.post("/user/address", authCheck, saveAddress);

router.post("/user/cart/coupon", authCheck, applyCouponToUserCart);

router.post("/user/order", authCheck, createOrder);
router.post("/user/cash-order", authCheck, createcodOrder);
router.get("/user/orders", authCheck, orders);
router.get("/sorder/:_id", authCheck, adminCheck, readOrder);

module.exports = router;
