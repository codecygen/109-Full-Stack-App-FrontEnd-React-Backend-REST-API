const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const hashPass = promisify(bcrypt.hash);
const comparePass = promisify(bcrypt.compare);

const DB = require("../models/DB");

const pickRandomColor = require("../utils/pickRandomColor");

const signup = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;

    const saltRounds = 12;
    const hashedPassword = await hashPass(password, saltRounds);

    const pickedColor = pickRandomColor();

    const newUser = new DB.User({
      email,
      password: hashedPassword,
      name: name.toLowerCase(),
      color: pickedColor,
    });

    const createdUser = await newUser.createUser();

    res.json({
      message: `User created!`,
      user: {
        email: createdUser.email,
        name: createdUser.name,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Authentication-and-Authorization-Backend
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const foundUser = await DB.User.findUserWithEmail(email);

    if (!foundUser) {
      const noUserError = new Error("Could not find user!");
      noUserError.inputErrors = [{ msg: "No user found!" }];
      throw noUserError;
    }

    const isPassCorrect = await comparePass(password, foundUser.password);

    if (!isPassCorrect) {
      const wrongPasswordError = new Error("Wrong password!");
      wrongPasswordError.inputErrors = [{ msg: "Wrong password!" }];
      throw wrongPasswordError;
    }

    const token = jwt.sign(
      {
        _id: foundUser._id.toString(),
        email: foundUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "10hr" }
    );

    res.json({
      message: "Logged in!",
      token,
      userId: foundUser._id,
      name: foundUser.name,
      color: foundUser.color,
      status: foundUser.status,
      expiry: new Date().getTime() + 10 * 60 * 60 * 1000,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { signup, login };
