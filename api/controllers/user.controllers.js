const UserModule = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CustomError = require("../util/errorHandler");
var cookie = require("cookie");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new CustomError("name, email and password are required", 400);
    }

    const existingUser = await UserModule.findOne({ email });
    if (existingUser) {
      throw new CustomError("User already exists", 402);
    }

    const user = await UserModule.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });
    if (!user) {
      throw new CustomError("Unable to create user", 401);
    }
    res.status(200).json(user);
  } catch (err) {
    //console.log(req);
    console.log(err);
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModule.findOne({ email });
    if (!user) {
      throw new CustomError("No user exists like this", 402);
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new CustomError("Incorrect password", 402);
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWTSECRET
    );
    const exptime = 60 * 60 * 1000; // 1 hour

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true, // Set to true if using HTTPS
        sameSite: "None", // For cross-site cookies
        maxAge: exptime,
        domain: "bookingsapp.onrender.com", // Your domain here
      })
      .json({ data: { name: user.name, email: user.email } });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const { user } = req;

    res.status(200).json({ name: user.name, email: user.email });
  } catch (err) {
    //console.log(req);
    console.log(err);
    next(err);
  }
};

const logout = async (req, res, err) => {
  try {
    res.clearCookie("token").status(200).json({ message: "Logged out" });
  } catch (err) {
    //console.log(req);
    console.log(err);
    next(err);
  }
};

module.exports = { register, login, getProfile, logout };
