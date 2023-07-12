import jwt from "jsonwebtoken";

export const authorize = (req, res, next) => {
  const token = req.headers["authorization"];
  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) return res.status(401).send(err);
    req.user = decoded.data;
    next();
  });
};
