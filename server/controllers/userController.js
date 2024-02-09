const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const hashPass = promisify(bcrypt.hash);
const comparePass = promisify(bcrypt.compare);

const DB = require("../models/DB");

const signup = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;

    const saltRounds = 12;
    const hashedPassword = await hashPass(password, saltRounds);

    const newUser = new DB.User({
      email,
      password: hashedPassword,
      name,
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

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const foundUser = await DB.User.findUserWithEmail(email);

    if (!foundUser) {
      throw new Error("Could not find user!");
    }

    const isPassCorrect = await comparePass(password, foundUser.password);

    if (!isPassCorrect) {
      throw new Error("Password mismatch!");
    }

    const token = jwt.sign(
      {
        _id: foundUser._id.toString(),
        email: foundUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Logged in!",
      token,
      userId: foundUser._id,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { signup, login };
