var jwt = require("jsonwebtoken");
const SECRET = "secret";

module.exports = (payload) => {
  return jwt.sign(
    {
      data: payload,
    },
    SECRET,
    { expiresIn: 60 * 60 } //1 HOUR
  );
};
