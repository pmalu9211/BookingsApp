const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const userRouter = require("./routes/user.routes.js");
const placeRouter = require("./routes/place.routes.js");
const fileRouter = require("./routes/file.routes.js");
const bookingRouter = require("./routes/booking.routes.js");

app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "16kb" })); //we encode the url in a way that we can get information from it like in yt search " " = "+"

const corsOptions = {
  origin: "https://bookingsapp.vercel.app",
  // origin: "http://localhost:5173",
  credentials: true, // This allows cookies to be sent and received
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://bookingsapp.vercel.app");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use("/api/v1/user", userRouter);
app.use("/api/v1/place", placeRouter);
app.use("/api/v1/file", fileRouter);
app.use("/api/v1/booking", bookingRouter);
app.use((err, req, res, next) => {
  const response = {
    headers: req.headers,
    query: req.query,
    params: req.params,
    user: req.user, // Only include user info if it's safe
    path: req.path,
    method: req.method,
    cookies: req.cookies,
    signedCookies: req.signedCookies,
    cookie: req.cookie,
  };
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    response: response,
    success: false,
    status: errorStatus,
    message: errorMessage,
  });
});

module.exports = app;
