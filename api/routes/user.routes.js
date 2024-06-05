const { Router } = require("express");
const {
  register,
  login,
  getProfile,
  logout,
} = require("../controllers/user.controllers");
const auth = require("../middleware/auth");

const userRouter = Router();
userRouter.route("/register").post(register);
userRouter.route("/login").post(login);
userRouter.route("/profile").get(auth, getProfile);
userRouter.route("/logout").post(auth, logout);

module.exports = userRouter;
