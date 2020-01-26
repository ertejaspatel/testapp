const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
    addressLine1: {
        type: String,
        required: [true, "Address Line 1 must be provided"]
      },
      addressLine2: {
        type: String,
        required: [true, "Address Line 2 must be provided"]
      },
      suburb: {
        type: String,
        required: [true, "Area/Suburb must be provided"]
      },
      city: {
        type: String,
        required: [true, "City/Town must be provided"]
      },
      zip: {
        type: String,
        required: [true, "Postal code must be provided"]
      },
      state: {
        type: String,
        required: [true, "State/Region must be provided"]
      },
      countryCode: {
        type: String,
        required: [true, "Country must be provided"]
      }
});

module.exports = AddressSchema;