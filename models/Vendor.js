const bcrypt = require("bcrypt");
const crypto = require("crypto");
const mongoose = require("mongoose");
const User = require("./User");
const PointSchema = require("./PointSchema");
const AddressSchema = require("./AddressSchema");

const vendorSchema = new mongoose.Schema(
  {
    email: {
      required: [true, "Email must be provided"],
      type: String,
      unique: true,
      lowercase: true
    }, //account email address
    company: {
      type: String,
      required: [true, "Legal company name must be provided"]
    },
    tradingName: {
      type: String,
      required: [true, "Trading name must be provided"]
    },
    website: String,
    gstin: {
      type: String,
      required: [true, "GST No must be provided"],
      unique: true,
      uppercase: true
    },
    typeOfBusiness: {
      type: String,
      required: [true, "Type of business must be provided"]
    },
    physicalLocations: String,
    userId: String,
    hasNewsletterSubscribed: Boolean,

    billingAddress: {
      type: AddressSchema,
      required: [true, "Billing Address must be provided"]
    },

    stores: [
      {
        name: String,
        address: {
          addressLine1: String,
          addressLine2: String,
          suburb: String,
          city: String,
          zip: String,
          state: String,
          countryCode: String
        },
        openingHours: [{ day: String, start: String, end: String }]
      }
    ],

    primaryContact: {
      firstName: {
        type: String,
        required: [true, "First Name must be provided"]
      },
      lastName: {
        type: String,
        required: [true, "Last Name must be provided"]
      },
      email: {
        type: String,
        unique: true,
        lowercase: true
      },
      mobile: String,
      phone: {
        type: String,
        required: [true, "Phone no. must be provided"]
      },
      position: {
        type: String,
        required: [true, "Designation must be provided"]
      },
      picture: String
    },

    verification: {
      id: Boolean,
      photo: Boolean,
      address: Boolean,
      verifiedBy: String,
      verifiedAt: Date
    },

    adverts: [{
      title: {
        type: String,
        required: [true, "Title must be provided"]
      },
      original_price:{
        type: Number,
        required: [true, "Original price must be provided"]
      },
      deal_price:{
        type: Number,
        required: [true, "Deal price must be provided"]
      },
      location: {
        type: PointSchema,
        required: true
      },
      shortDescription:{
        type: String
      },
      longDescription: {
        type: String
      },
      images: [
        {
          url: {
            type: String
          }
        }
      ]      
    }]
  },
  { timestamps: true }
);

vendorSchema.virtual("fullname").get(function() {
  return this.primaryContact.firstName + " " + this.primaryContact.lastName;
});

// vendorSchema.methods.getUser = function() {
//   const user = new User({
//     email: this.email,
//     type: "vendor",
//     profile: {
//       name: this.fullname,
//       picture: this.primaryContact.picture
//     }
//   });

//   return user;
// };

const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;
