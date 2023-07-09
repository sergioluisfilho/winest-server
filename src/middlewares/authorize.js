import jwt from "jsonwebtoken";
const SECRET = "secret";

export const authorize = (req, res, next) => {
  const token = req.headers["authorization"];
  console.log(token);
  jwt.verify(token, SECRET, function (err, decoded) {
    if (err) return res.status(401).send(err);
    req.user = decoded.data;
    next();
  });
};
