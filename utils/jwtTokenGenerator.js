require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.ACCESS_TOKEN_SECRET;
let jwtTokenGeneration = async (TokenObj) => {
  const accessToken = jwt.sign(TokenObj, jwtSecretKey, {
    expiresIn: "24h",
  });
  return accessToken;
};

module.exports = { jwtTokenGeneration: jwtTokenGeneration };
