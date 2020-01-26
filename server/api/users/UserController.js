const User = require("../../../models/User");
const AppError = require("../../../utils/AppError");

exports.getUserByEmail = async email => {
  return await User.findOne({ email: email });
};

exports.getUsers = async (req, res) => {
  const users = await User.find({});
  return res.status(200).json({
    status: "success",
    data: {
      users
    },
    count: users.length
  });
};

/**
 * GET /api/users/me
 */

exports.getCurrentUserProfile = (req, res, next) => {
  console.log(req.user);
  if (req.user) {
    res.status(200).json({
      data: {
        user: req.user
      }
    });
  } else {
    next(new AppError("User is not logged in", 401));
  }
};
