import { Router } from "express";
import RegisterController from "./controllers/RegisterController";
import LoginController from "./controllers/LoginController";
import { authorize } from "./middlewares/authorize";

const routes = Router();

routes.post("/register", RegisterController.create);
routes.post("/login", LoginController.auth);

routes.get("/", authorize, (req, res) => {
  console.log("ok");
  return res.send("Connected");
});

export default routes;
