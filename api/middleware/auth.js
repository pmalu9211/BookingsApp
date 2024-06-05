const jwt = require("jsonwebtoken");
const UserModule = require("../models/user");
const CustomError = require("../util/errorHandler");
require("dotenv").config();
const auth = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

    console.log(token);
    if (!token) {
      throw new CustomError("User is not logged in", 400);
    }
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    console.log(decoded);
    const user = await UserModule.findOne({
      _id: decoded.id,
    }).select("-password");
    if (!user) {
      throw new CustomError("User is not logged skibidi in", 400);
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = auth;
