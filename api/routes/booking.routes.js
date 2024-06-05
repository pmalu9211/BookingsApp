const { Router } = require("express");
const {
  getBookings,
  deleteBooking,
  uploadBooking,
} = require("../controllers/booking.controllers");
const auth = require("../middleware/auth");

const bookingRouter = Router();

bookingRouter.route("/bookings").get(auth, getBookings);
bookingRouter.route("/bookings").post(auth, uploadBooking);
bookingRouter.route("/deleteBooking").post(auth, deleteBooking);

module.exports = bookingRouter;
