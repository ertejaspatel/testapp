// const { createServer } = require("http");
// const { parse } = require("url");
const next = require("next");
const express = require("express");
const bodyParser = require("body-parser"); // parses req.body
const morgan = require("morgan");
const axios = require("axios");
const chalk = require("chalk");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: ".env" });

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

/**
 * Connect to MongoDB.
 */
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("error", err => {
  console.error(err);
  console.log(
    "%s MongoDB connection error. Please make sure MongoDB is running.",
    chalk.red("✗")
  );
  process.exit();
});

/**
 * API keys and Passport configuration.
 */
const passportConfig = require("../config/passport");

/**
 * Controllers
 */
const globalErrorHandler = require("./api/ErrorController");
const userApiController = require("../server/api/users/UserController");

const vendorRouter = require("./routes/VendorRoutes");
const userRouter = require("./routes/UserRoutes");
const locationsRouter = require("./routes/LocationsRoutes");

// console.log("Vendor Router", vendorRouter);

const adverts = require("./data.json");

app.prepare().then(() => {
  const server = express();

  server.use(morgan("dev"));
  server.use(express.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json())
  
  //app.use(express.bodyParser());
  server.use(cookieParser());
  server.use(
    session({
      resave: true,
      saveUninitialized: true,
      secret: process.env.SESSION_SECRET,
      cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
      store: new MongoStore({
        // url: process.env.MONGODB_URI,
        mongooseConnection: mongoose.connection,
        autoReconnect: true
      })
    })
  );

  // server.use(passport.initialize());
  // server.use(passport.session());
  server.use(flash());


  server.use("/api/vendors", vendorRouter);
  server.use("/api/users", userRouter);
  server.use("/api/locations", locationsRouter);

  server.get("/api/account/me", userApiController.getCurrentUserProfile);

  server.use(globalErrorHandler);

  const PORT = process.env.PORT || 3000;

  server.use(handle).listen(PORT, err => {
    if (err) throw err;
    console.log("> Ready on port " + PORT);
  });
});
