const { promisify } = require("util");
const bcrypt = require("bcrypt");
const hashPass = promisify(bcrypt.hash);

const DB = require("../models/DB");

const signup = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;

    const saltRounds = 12;
    const hashedPassword = await hashPass(password, saltRounds);
    
    console.log(email, name, hashedPassword);
  } catch (err) {
    next(err);
  }
};

module.exports = { signup };
