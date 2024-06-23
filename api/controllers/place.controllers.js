var jwt = require("jsonwebtoken");
const PlaceModule = require("../models/place.js");
const { default: mongoose } = require("mongoose");
const CustomError = require("../util/errorHandler.js");

const uploadPlace = async (req, res, next) => {
  console.log("ok");

  try {
    const user = req.user;
    // console.log("Hello///////", user);
    const {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = req.body;
    console.log("ok");

    if (
      !title ||
      !address ||
      !addedPhotos ||
      !checkIn ||
      !checkOut ||
      !maxGuests ||
      !price
    ) {
      throw new CustomError(
        "Title or address or photos or checkIn or checkout or maxGuests or proce are missing please fill these fields",
        400
      );
    }

    console.log("ok");
    const document = await PlaceModule.create({
      owner: new mongoose.Types.ObjectId(user.id),
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });

    if (!document) {
      throw new CustomError("Unable to create place", 300);
    }

    res.status(200).json({ document });
  } catch (err) {
    console.log(err);
    //console.log(req);
    console.log(err);
    next(err);
  }
};

const updatePlace = async (req, res, next) => {
  try {
    const { id } = req.params;

    const placeDoc = await PlaceModule.findById(id);
    const { owner } = placeDoc;

    const {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = req.body;

    if (
      !title ||
      !address ||
      !addedPhotos ||
      !checkIn ||
      !checkOut ||
      !maxGuests ||
      !price
    ) {
      throw new CustomError(
        "Title or address or photos or checkIn or checkout or maxGuests or proce are missing please fill these fields",
        400
      );
    }

    const userData = req.user;
    if (!(userData.id.toString() === owner.toString())) {
      throw new CustomError("You can't update this place");
    }
    const document = await PlaceModule.findByIdAndUpdate(
      id,
      {
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      },
      { new: true }
    );
    // console.log(document);
    res.status(200).json(document);
  } catch (err) {
    //console.log(req);
    console.log(err);
    next(err);
  }
};

getUsersPlaces = async (req, res, next) => {
  try {
    const { user } = req;
    const document = await PlaceModule.aggregate([
      { $match: { owner: new mongoose.Types.ObjectId(user.id) } },
    ]);

    res.status(200).json({ document });
  } catch (err) {
    //console.log(req);
    console.log(err);
    next(err);
  }
};

const getPlaceById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const document = await PlaceModule.findById(id);
    if (!document) throw new CustomError("Unable to find place", 400);
    console.log(document);
    res.status(200).json(document);
  } catch (err) {
    //console.log(req);
    console.log(err);
    next(err);
    console.log(err.message);
  }
};

const deletePlace = async (req, res, next) => {
  try {
    const { id } = req.body;
    const document = await PlaceModule.findByIdAndDelete(id);
    if (!document) throw new CustomError("Unable to delete place", 300);
    res.status(200).json(document);
  } catch (err) {
    //console.log(req);
    console.log(err);
    next(err);
  }
};

const getPlacesForHome = async (req, res, next) => {
  try {
    const document = await PlaceModule.find();
    res.status(200).json(document);
  } catch (err) {
    //console.log(req);
    console.log(err);
    next(err);
  }
};

module.exports = {
  uploadPlace,
  updatePlace,
  getUsersPlaces,
  getPlaceById,
  deletePlace,
  getPlacesForHome,
};
