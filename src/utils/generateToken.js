import jwt from "jsonwebtoken";
const SECRET = "secret";

export const generateToken = (payload) => {
  return jwt.sign(
    {
      data: payload,
    },
    SECRET,
    { expiresIn: 60 * 60 } //1 HOUR
  );
};
