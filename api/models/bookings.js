const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  checkIn: Date,
  checkOut: Date,
  numberOfGuests: Number,
  name: String,
  phone: String,
  price: Number,
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Place",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const BookingModule = mongoose.model("Booking", bookingSchema);

module.exports = BookingModule;
