const DB = require("../models/DB");

const signup = async (req, res, next) => {
  const { email, name, password } = req.body;

  console.log(email, name, password);
};

module.exports = { signup };
