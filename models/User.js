const bcrypt = require("bcrypt");
const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const { milliseconds } = require("../utils/Utils");

const userSchema = new mongoose.Schema(
  {
    email: {
      required: [true, "Email must be provided"],
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"]
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      select: false
    },

    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,

    emailVerificationToken: String,
    isEmailVerified: Boolean,

    profile: {
      name: String,
      dob: String,
      gender: String,
      location: String,
      picture: String
    },
    isActive: {
      type: Boolean,
      default: true,
      select: false
    },
    role:{
      type: String,
      enum: ['super_admin', 'employee', 'vendor', 'user'],
      required: true
    },

    snapchat: String,
    facebook: String,
    twitter: String,
    google: String,
    github: String,
    instagram: String,
    linkedin: String,
    steam: String,
    quickbooks: String,
    tokens: Array,

    
  },
  { timestamps: true }
);

/**
 * Password hash middleware.
 */
userSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

/// Log when password was last changed
userSchema.pre("save", function(next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});
/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = async function(candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

/**
 * Helper method to check if password is changed after token is issued.
 */
userSchema.methods.changedPasswordAfterTokenIssued = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log({ resetToken }, this.passwordResetToken);

  //expires after 10mins
  this.passwordResetExpires = Date.now() + milliseconds(0, 0, 10, 0);

  return resetToken;
};

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function gravatar(size) {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto
    .createHash("md5")
    .update(this.email)
    .digest("hex");
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
