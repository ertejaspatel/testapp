const bcrypt = require("bcrypt");
const crypto = require("crypto");
const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  id: { type: "Number" },
  name: { type: "String" },
  iso3: { type: "String" },
  iso2: { type: "String" },
  phone_code: { type: "Date" },
  capital: { type: "String" },
  currency: { type: "String" },
  states: {}
});

const Country = mongoose.model("Country", countrySchema);

module.exports = Country;
