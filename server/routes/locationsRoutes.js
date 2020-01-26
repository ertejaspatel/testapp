const locationsController = require("../api/locations/LocationsController");
const express = require("express");

//route = /api/locations

const router = express.Router();

router.route("/countries/:country").get(locationsController.getCountry);
router.route("/countries").get(locationsController.getAllCountries);

module.exports = router;
