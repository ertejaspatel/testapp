const User = require("../../../models/User");
const Vendor = require("../../../models/Vendor");
const catchAsync = require("../../../utils/CatchAsync");
const {getFullName} = require("../../../utils/Utils");
const AppError = require("../../../utils/AppError");

exports.getAllVendors = catchAsync(async (req, res, next) => {
  const vendors = await Vendor.find();
  return res.status(200).json({
    data: {
      vendors
    }
  });
});

exports.getVendor = (req, res) => {
  res.status(500).json({
    success: "error",
    message: "This route is not defined yet"
  });
};

exports.updateVendor = (req, res) => {
  res.status(500).json({
    success: "error",
    message: "This route is not defined yet"
  });
};

exports.deleteVendor = (req, res) => {
  res.status(500).json({
    success: "error",
    message: "This route is not defined yet"
  });
};

exports.createVendor = catchAsync(async(req, res, next) => {

  console.log("Update Profile", req.body);

  // 1. Check if user already exist with provided email address
  // 2. If User Exist - Check if associated vendor account exist
  // 3. If Vendor Account exist - Report back with error
  // 4. If user does not exist - Create a new user with given credentials
  // 5. If user exist but vendor account doesn't exist then update user role to vendor
  // 4. Create Vendor
  // 5. Return Vendor

  let user = await User.findOne({"email": req.body.email});
  if(user){    
    console.log("User Exists", user);
    const vendor = await Vendor.findOne({"userId": user._id});
    if(vendor){
      console.log("Vendor Exists", vendor);
      next(new AppError("Vendor Account exist for given email address", 422));
    }
    else{
      console.log("Vendor does not Exists");
      user.role = "vendor";      
      user.save();
      console.log("User", user);
    }
  }
  else{      
    user = new User();
    user.email = req.body.email;
    user.profile.name = getFullName(req.body.primaryContact.firstName, req.body.primaryContact.lastName);
    user.profile.gender = req.body.primaryContact.gender || "";
    user.profile.location = req.body.billingAddress.city || "";
    user.profile.website = req.body.website || "";    
    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    user.role = "vendor"; 
    user.isActive = true;
    user.isEmailVerified = false;
    user.save();    
  }
  console.log("Primary Contact", req.body.primaryContact);
  
  const vendor = new Vendor(req.body); 
  vendor.userId = user._id;
  vendor.primaryContact.email = req.body.email;
  vendor.save();
  
  res.status(200).json({  
      success: true,
      vendor: vendor    
  });
  
  
});
