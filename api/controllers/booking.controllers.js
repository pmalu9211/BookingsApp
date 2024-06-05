const { default: mongoose } = require("mongoose");
const BookingModule = require("../models/bookings");
const jwt = require("jsonwebtoken");
const CustomError = require("../util/errorHandler");

uploadBooking = async (req, res, next) => {
  try {
    const info = req.user;
    console.log(__dirname, info);
    const { checkIn, checkOut, numberOfGuests, name, phone, place, price } =
      req.body;
    const document = await BookingModule.create({
      user: new mongoose.Types.ObjectId(info.id),
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      numberOfGuests,
      name,
      phone,
      place,
      price,
    });

    if (!document) throw new CustomError("Unable to upload booking", 400);

    console.log(document);
    res.status(200).json(document);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

getBookings = async (req, res) => {
  try {
    const info = req.user;
    console.log(__dirname, info);

    const document = await BookingModule.find({
      user: new mongoose.Types.ObjectId(info.id),
    }).populate("place");
    console.log(document);
    res.status(200).json(document);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

deleteBooking = async (req, res) => {
  try {
    const { id } = req.body;
    const document = await BookingModule.findByIdAndDelete(id);
    if (!document) throw new CustomError("Unable to delete booking", 300);
    res.status(200).json(document);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { uploadBooking, getBookings, deleteBooking };
