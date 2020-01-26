const usersController = require("../api/users/UserController");
const vendorAuthApiController = require("../api/vendors/AuthController");

const express = require("express");

//route = /api/users

const router = express.Router();

router
  .route("/")
  .get(vendorAuthApiController.protect, usersController.getUsers);
router
  .route("/me")
  .get(vendorAuthApiController.protect, usersController.getCurrentUserProfile);

module.exports = router;
