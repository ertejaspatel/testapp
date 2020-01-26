const AppError = require("../../../utils/AppError");
const Vendor = require("../../../models/Vendor");
const catchAsync = require("../../../utils/CatchAsync");

exports.getVendorAdvertisements = catchAsync(async(req, res) => {
  console.log("User", req.user);
  if(req.user && req.user.vendor){    
    res.status(200).json({
      id: req.params.id,
      vendor: req.user.vendor
    });
  }
  else{
    res.status(500).json({
      success: "error",
      message: "Invalid User and/or Vendor"
    });
  }
});

exports.createVendorAdvertisement = catchAsync(async(req, res) => {
  if(req.params.id){

  }
  else{
    return new AppError("Invalid Vendor Id", 422);
  }
});

exports.updateVendorAdvertisement = (req, res) => {
  res.status(500).json({
    success: "error",
    message: "This route is not defined yet"
  });
};

exports.deleteVendorAdvertisement = (req, res) => {
  res.status(500).json({
    success: "error",
    message: "This route is not defined yet"
  });
};

exports.publishVendorAdvertisement = (req, res) => {
  res.status(500).json({
    success: "error",
    message: "This route is not defined yet"
  });
};

exports.unPublishVendorAdvertisement = (req, res) => {
  res.status(500).json({
    success: "error",
    message: "This route is not defined yet"
  });
};
