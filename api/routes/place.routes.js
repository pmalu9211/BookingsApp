const { Router } = require("express");
const {
  deletePlace,
  updatePlace,
  getPlaceById,
  getPlacesForHome,
  uploadPlace,
  getUsersPlaces,
} = require("../controllers/place.controllers");
const auth = require("../middleware/auth");

const placeRouter = Router();

placeRouter.route("/places").get(auth, getUsersPlaces);
placeRouter.route("/place/:id").get(getPlaceById);
placeRouter.route("/place").post(auth, uploadPlace);
placeRouter.route("/place/:id").put(auth, updatePlace);
placeRouter.route("/deletePlace").post(auth, deletePlace);
placeRouter.route("/homePlaces").get(getPlacesForHome);

module.exports = placeRouter;
