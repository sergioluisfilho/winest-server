import { Router } from "express";
import RegisterController from "./controllers/RegisterController";
import LikeController from "./controllers/LikeController";
import LoginController from "./controllers/LoginController";
import PostController from "./controllers/PostController";
import CommentController from "./controllers/CommentController";
import ChatController from "./controllers/ChatController";
import MessageController from "./controllers/MessageController";
import NotificationController from "./controllers/NotificationController";
import ProfileController from "./controllers/ProfileController";
import PageController from "./controllers/PageController";

import { authorize } from "./middlewares/authorize";
import { upload } from "./aws/s3";

const routes = Router();

routes.post("/register", RegisterController.create);
routes.post("/login", LoginController.auth);
routes.get("/profile", authorize, ProfileController.index);
routes.put("/profile", authorize, ProfileController.update);
routes.get("/page/:id", authorize, PageController.index);
routes.get("/notifications", authorize, NotificationController.show);
routes.put("/notifications/:id", authorize, NotificationController.update);
routes.post("/notifications", authorize, NotificationController.create);
routes.post("/posts", authorize, PostController.create);
routes.get("/posts", authorize, PostController.show);
routes.post("/posts/:id/like", authorize, LikeController.like);
routes.delete("/posts/:id/like", authorize, LikeController.unlike);
routes.post("/posts/:id/comments", authorize, CommentController.createComment);
routes.get("/", (req, res) => res.send("Connected"));
routes.get("/chats", authorize, ChatController.show);
routes.get("/chats/:id", authorize, ChatController.index);
routes.post("/message/:id", authorize, MessageController.create);

routes.post("/upload", upload.single("image"), async (req, res) => {
  return res.send();
});

export default routes;
