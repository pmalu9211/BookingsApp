const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const userRouter = require("./routes/user.routes.js");
const placeRouter = require("./routes/place.routes.js");
const fileRouter = require("./routes/file.routes.js");
const bookingRouter = require("./routes/booking.routes.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/place", placeRouter);
app.use("/api/v1/file", fileRouter);
app.use("/api/v1/booking", bookingRouter);
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
  });
});

module.exports = app;
