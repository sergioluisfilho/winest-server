import { Router, response } from "express";
import RegisterController from "./controllers/RegisterController";
import LikeController from "./controllers/LikeController";
import LoginController from "./controllers/LoginController";
import PostController from "./controllers/PostController";
import CommentController from "./controllers/CommentController";
// import ProfileController from "./controllers/ProfileController";
import NotificationController from "./controllers/NotificationController";

import { authorize } from "./middlewares/authorize";
import { upload } from "./aws/s3";

const routes = Router();

routes.post("/register", RegisterController.create);
routes.post("/login", LoginController.auth);
// routes.get("/profile", authorize, ProfileController.show);
// routes.put("/profile", authorize, ProfileController.update);
routes.get("/notifications", authorize, NotificationController.show);
routes.put("/notifications/:id", authorize, NotificationController.update);
routes.post("/notifications", authorize, NotificationController.create);
routes.post("/posts", authorize, PostController.create);
routes.get("/posts", authorize, PostController.show);
routes.post("/posts/:id/like", authorize, LikeController.like);
routes.delete("/posts/:id/like", authorize, LikeController.unlike);
routes.post("/posts/:id/comments", authorize, CommentController.createComment);

routes.get("/", (req, res) => res.send("Connected"));

routes.post("/upload", upload.single("image"), async (req, res) => {
  return res.send();
});

export default routes;
