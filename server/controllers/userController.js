const { promisify } = require("util");
const bcrypt = require("bcrypt");
const hashPass = promisify(bcrypt.hash);

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

module.exports = { signup };
