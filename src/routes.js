import { Router, response } from "express";
import RegisterController from "./controllers/RegisterController";
import LikeController from "./controllers/LikeController";
import LoginController from "./controllers/LoginController";
import PostController from "./controllers/PostController";
import { authorize } from "./middlewares/authorize";
import { upload } from "./aws/s3";

const routes = Router();

routes.post("/register", RegisterController.create);
routes.post("/login", LoginController.auth);

routes.post("/posts", authorize, PostController.create);
routes.get("/posts", authorize, PostController.show);
routes.post("/posts/:id/like", authorize, LikeController.like);
routes.delete("/posts/:id/like", authorize, LikeController.unlike);
// routes.get("/posts/:id/comments", authorize, PostController.unlike);
// routes.post("/posts/:id/comments", authorize, PostController.unlike);

routes.get("/", authorize, (req, res) => {
  console.log("ok");
  return res.send("Connected");
});

routes.post("/upload", upload.single("image"), async (req, res) => {
  return res.send();
});

export default routes;
