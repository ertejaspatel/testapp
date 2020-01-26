const vendorAuthApiController = require("../api/vendors/AuthController");
const vendorsApiController = require("../api/vendors/VendorController");
const vendorAdApiController = require("../api/vendors/VendorAdController");
const express = require("express");

//route = /api/vendors

const router = express.Router();

router.route("/login").post(vendorAuthApiController.login);
router.route("/logout").get(vendorAuthApiController.logout);

router.post("/forgotPassword", vendorAuthApiController.forgotPassword);
router.patch("/resetPassword/:token", vendorAuthApiController.resetPassword);

router.patch(
  "/updateMyPassword",
  vendorAuthApiController.protect,
  vendorAuthApiController.updatePassword
);

router
  .route("/")
  .get(vendorAuthApiController.protect, vendorsApiController.getAllVendors)
  .post(vendorsApiController.createVendor);

router
  .route("/:id")
  .get(vendorsApiController.getVendor)
  .patch(vendorsApiController.updateVendor)
  .delete(vendorsApiController.deleteVendor);

module.exports = router;
