const passport = require("passport");
const refresh = require("passport-oauth2-refresh");
const axios = require("axios");

const { Strategy: LocalStrategy } = require("passport-local");
const _ = require("lodash");
const moment = require("moment");

const User = require("../models/User");

passport.serializeUser((user, done) => {
  console.log("Serialing User", user.id);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    // console.log("Deserialing User", id, err);
    done(err, user);
  });
});

const LocalStrategyLogin = async (email, password, done) => {
  let user = null;
  try {
    user = await User.findOne({ email: email.toLowerCase() });
    // console.log("User Found", user);
  } catch (err) {
    return done(err);
  }

  if (!user) {
    return done(null, false, { msg: `Email ${email} not found.` });
  }
  if (!user.password) {
    return done(null, false, {
      msg:
        "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile."
    });
  }

  try {
    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      return done(null, user);
    }
    return done(null, false, { msg: "Invalid email or password." });
  } catch (err) {
    return done(err);
  }
};

/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy(LocalStrategyLogin));

exports.isVendorAuthenticated = (req, res, next) => {
  // console.log("passport user", req._passport.instance);
  if (req.isAuthenticated()) {
    return next();
  } else {
    if (req.headers["accept"] == "application/json") {
      res.status(401);
      // res.json({ error: true, status: 401, message: "Unauthorized" }); // passing 401 status as data rather than http status
    } else {
      res.redirect("/vendor/login");
    }
  }
};

/**
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
  // console.log("passport user", req._passport.instance);
  if (req.isAuthenticated()) {
    return next();
  } else {
    if (req.headers["accept"] == "application/json") {
      res.status(401);
      // res.json({ error: true, status: 401, message: "Unauthorized" }); // passing 401 status as data rather than http status
    } else {
      // console.log("Headers ", req.get("content-type"), req.headers, req.url);
      res.redirect("/auth/login");
    }
  }
};

/**
 * Authorization Required middleware.
 */
exports.isAuthorized = (req, res, next) => {
  const provider = req.path.split("/")[2];
  const token = req.user.tokens.find(token => token.kind === provider);
  if (token) {
    // Is there an access token expiration and access token expired?
    // Yes: Is there a refresh token?
    //     Yes: Does it have expiration and if so is it expired?
    //       Yes, Quickbooks - We got nothing, redirect to res.redirect(`/auth/${provider}`);
    //       No, Quickbooks and Google- refresh token and save, and then go to next();
    //    No:  Treat it like we got nothing, redirect to res.redirect(`/auth/${provider}`);
    // No: we are good, go to next():
    if (
      token.accessTokenExpires &&
      moment(token.accessTokenExpires).isBefore(moment().subtract(1, "minutes"))
    ) {
      if (token.refreshToken) {
        if (
          token.refreshTokenExpires &&
          moment(token.refreshTokenExpires).isBefore(
            moment().subtract(1, "minutes")
          )
        ) {
          res.redirect(`/auth/${provider}`);
        } else {
          refresh.requestNewAccessToken(
            `${provider}`,
            token.refreshToken,
            (err, accessToken, refreshToken, params) => {
              User.findById(req.user.id, (err, user) => {
                user.tokens.some(tokenObject => {
                  if (tokenObject.kind === provider) {
                    tokenObject.accessToken = accessToken;
                    if (params.expires_in)
                      tokenObject.accessTokenExpires = moment()
                        .add(params.expires_in, "seconds")
                        .format();
                    return true;
                  }
                  return false;
                });
                req.user = user;
                user.markModified("tokens");
                user.save(err => {
                  if (err) console.log(err);
                  next();
                });
              });
            }
          );
        }
      } else {
        res.redirect(`/auth/${provider}`);
      }
    } else {
      next();
    }
  } else {
    res.redirect(`/auth/${provider}`);
  }
};
