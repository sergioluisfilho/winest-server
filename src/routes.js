import { Router } from "express";
import RegisterController from "./controllers/RegisterController";
import LoginController from "./controllers/LoginController";
import PostController from "./controllers/PostController";
import { authorize } from "./middlewares/authorize";

const routes = Router();

routes.post("/register", RegisterController.create);
routes.post("/login", LoginController.auth);

routes.post("/posts", PostController.create);
routes.get("/posts", PostController.show);

routes.get("/", authorize, (req, res) => {
  console.log("ok");
  return res.send("Connected");
});

export default routes;
