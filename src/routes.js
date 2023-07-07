const { Router } = require("express");
const routes = new Router();
const RegisterController = require("./controllers/RegisterController");

routes.post("/register", RegisterController.create);

routes.get("/", (req, res) => {
  console.log("ok");
  return res.send("Connected");
});

module.exports = routes;
