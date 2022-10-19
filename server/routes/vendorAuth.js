const express = require("express");
const vendorAuthenticate = require("../middleware/vendorProtected");
const app = express();
const router = express.Router();
const { ItemCategory, CatImgUpload } = require("../models/itemCategory");
const { Item, itemImgUpload } = require("../models/item");

router.post("/signup", require("../controller/vendorAuth").signup);
router.post("/signin", require("../controller/vendorAuth").signin);
router.get(
  "/signout",
  vendorAuthenticate,
  require("../controller/vendorAuth").signout
);

router.get("/about", vendorAuthenticate, (req, res) => {
  res.send(req.rootVendor);
});

router.post(
  "/addcategory",
  vendorAuthenticate,
  CatImgUpload.single("image"),
  require("../controller/vendorDashboard").addcategory
);

router.post(
  "/item/new",
  vendorAuthenticate,
  itemImgUpload.single("image"),
  require("../controller/vendorDashboard").item
);

router.post("/");

module.exports = router;
