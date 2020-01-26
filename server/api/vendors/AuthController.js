const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const {
  promisify
} = require("util");
const passport = require("passport");
const _ = require("lodash");
const validator = require("validator");
const mailChecker = require("mailchecker");
const User = require("../../../models/User");
const catchAsync = require("../../../utils/CatchAsync");
const AppError = require("../../../utils/AppError");
const sendEmail = require("../../../utils/Email");

const {
  milliseconds
} = require("../../../utils/Utils");
const Vendor = require("../../../models/Vendor");


const signToken = id => {
  // console.log(id, process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN);
  return jwt.sign({
    id
  }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + milliseconds(process.env.JWT_COOKIE_EXPIRES_IN)
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user
    }
  });
};

const isPasswordsSame = (password, confirmPassword) => {
  return password == confirmPassword;
};

/**
 * POST /api/vendors/login
 * Sign in vendor using their username (email) and password.
 */
exports.login = catchAsync(async (req, res, next) => {
  const {
    username,
    password
  } = req.body;

  console.log("Req Body", req.body);

  // 1) Check if username and password exist
  if (!username || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }

  // 2) Check if user exists && password is correct
  const user = await User.findOne({
    email: username,
    role: "vendor"
  }).select(
    "+password"
  );

  const isMatch = await user.comparePassword(password);
  console.log(isMatch);

  if (!user || !isMatch) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const vendor = await Vendor.findOne({
    userId: user._id
  });

  if (!vendor) {
    return next(new AppError("No Vendor Account setup for this user. Please contact administrator", 401));
  } else {
    user.vendor = vendor;
  }

  // 3) If everything ok, send token to client
  // const token = signToken(user._id);

  // console.log(token);

  // user.password = undefined; // Remove password from output

  // return res.status(200).json({
  //   status: "success",
  //   token,
  //   data: {
  //     user
  //   }
  // });
  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    console.log("Auth token", req.cookies.jwt);
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    console.log("Cookie Token", req.cookies.jwt);
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // 2) Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfterTokenIssued(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  const vendor = await Vendor.findOne({
    userId: currentUser._id
  });

  if (!vendor) {
    return next(new AppError("No Vendor Account setup for this user. Please contact administrator", 401));
  } else {
    currentUser.vendor = vendor;
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

exports.isLoggedIn = async (req) => {
  const result = {
    success: false,
    user: null
  }
  // 1) Getting token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    console.log("Auth token", req.cookies.jwt);
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    console.log("Cookie Token", req.cookies.jwt);
    token = req.cookies.jwt;
  }

  if (!token) {    
    return result;
    // return new AppError("You are not logged in! Please log in to get access.", 401);
  }

  // 2) Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {    
      return result;  
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfterTokenIssued(decoded.iat)) {    
      // return new AppError("User recently changed password! Please log in again.", 401)
      return result;
  }
  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  return {
    success: true,
    user: currentUser
  }
};
/**
 * POST /forgotPassword
 * Send password reset email to reset the password
 */
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({
    email: req.body.email,
    role: "vendor"
  });

  if (!user) {
    return next(new AppError("There is no user with email address.", 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({
    validateBeforeSave: false
  });

  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/vendors/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 min)",
      message
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!"
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({
      validateBeforeSave: false
    });

    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});

/**
 * PATCH /resetPassword
 * Allows user to reset password by given reset link in the email
 * required: reset token, passowrd, passwordConfirm
 */

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    role: "vendor",
    passwordResetToken: hashedToken,
    passwordResetExpires: {
      $gt: Date.now()
    }
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  if (!isPasswordsSame(req.body.password, req.body.passwordConfirm)) {
    return next(new AppError("Passwords are not same!", 422));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  createSendToken(user, 200, res);
});

/**
 * PATH /updatePassword
 * Allows user to update current password
 * required: current password, new password and confirm password
 */

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select("+password");

  // 2) Check if POSTed current password is correct
  if (
    !req.body.passwordCurrent ||
    !(await user.comparePassword(req.body.passwordCurrent))
  ) {
    return next(new AppError("Your current password is wrong.", 401));
  }

  if (!isPasswordsSame(req.body.password, req.body.passwordConfirm)) {
    return next(new AppError("Passwords are not same!", 422));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});

exports.logout = (req, res, next) => {
  res.status(500).json({
    success: "error",
    message: "This route is not defined yet"
  });
};

// /**
//  * GET /api/users/me
//  */

// exports.getCurrentUserProfile = (req, res, next) => {
//   if (req.user) {
//     res.status(200).json({
//       data: {
//         user: req.user
//       }
//     });
//   } else {
//     next(new AppError("User is not logged in", 401));
//   }
// };