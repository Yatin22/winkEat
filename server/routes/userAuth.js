const express = require("express");
const mongoose = require("mongoose");
const userAuthenticate = require("../middleware/userProtected");
const Vendor = require("../models/Vendor");
const { Cart } = require("../models/Cart.js");
const { Item } = require("../models/item");
const errorResponce = require("../utils/errorResponce");
const otpRoute=require('./otpRoutes');


const app = express();
const router = express.Router();

// @desc    Get all vendors
// @route   GET /api/v1/vendors
// @access  Public
router.get("/", userAuthenticate, async (req, res, next) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json({
      success: true,
      count: vendors.length,
      data: vendors,
    });
  } catch (err) {
    return next(err);
  }
});
router.use("/signup", require("./otpRoutes"));
router.post("/signin", require("../controller/userAuth").signin);
router.get(
  "/signout",
  userAuthenticate,
  require("../controller/userAuth").signout
);

router.get("/about", userAuthenticate, (req, res) => {
  res.send(req.rootUser);
});

router.post(
  "/addtocart",
  userAuthenticate,
  require("../controller/userDashboard").addtocart
);

module.exports = router;
