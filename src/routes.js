import { Router } from "express";
import RegisterController from "./controllers/RegisterController";

const routes = Router();

routes.post("/register", RegisterController.create);

routes.get("/", (req, res) => {
  console.log("ok");
  return res.send("Connected");
});

export default routes;
