const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const userRouter = require("./routes/user.routes.js");
const placeRouter = require("./routes/place.routes.js");
const fileRouter = require("./routes/file.routes.js");
const bookingRouter = require("./routes/booking.routes.js");

app.use(express.urlencoded({ extended: true, limit: "16kb" })); //we encode the url in a way that we can get information from it like in yt search " " = "+"

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://bookingsapp-1gasb0t9x-pmalu9211s-projects.vercel.app",
    ], // Replace with your frontend's origin
    methods: ["POST", "GET", "PUT"],
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "https://bookingsapp-1gasb0t9x-pmalu9211s-projects.vercel.app"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
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
