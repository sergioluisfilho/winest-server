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
import WineController from "./controllers/WineController";
import FavoriteWineController from "./controllers/FavoriteWineController";
import UserController from "./controllers/UserController";

import { authorize } from "./middlewares/authorize";
import { upload } from "./aws/s3";

const routes = Router();

routes.post("/register", RegisterController.create);
routes.post("/auth/login", LoginController.auth);
routes.get("/profile", authorize, ProfileController.index);
routes.put("/profile", authorize, ProfileController.update);
routes.get("/page/:id", authorize, PageController.index);
routes.get("/notifications", authorize, NotificationController.show);
routes.put("/notifications/:id", authorize, NotificationController.update);
routes.post("/notifications", authorize, NotificationController.create);
routes.post("/posts", authorize, upload.single("image"), PostController.create);
routes.get("/posts", authorize, PostController.show);
routes.post("/posts/:id/like", authorize, LikeController.like);
routes.delete("/posts/:id/like", authorize, LikeController.unlike);
routes.post("/posts/:id/comments", authorize, CommentController.createComment);
routes.get("/", (req, res) => res.send("Connected"));
routes.get("/chats", authorize, ChatController.show);
routes.get("/chats/:id", authorize, ChatController.index);
routes.post("/message/:id", authorize, MessageController.create);
routes.get("/wines", authorize, WineController.show);
routes.get("/wines/:id", authorize, WineController.index);
routes.get("/favorites/wines", authorize, FavoriteWineController.show);
routes.post("/favorites/wines/:id", authorize, FavoriteWineController.create);
routes.delete("/favorites/wines/:id", authorize, FavoriteWineController.remove);
routes.get("/users/search", authorize, UserController.show);
//routes.post("wines/sugest", authorize, WineController.create);
routes.post(
  "/profile/picture/upload",
  authorize,
  upload.single("image"),
  ProfileController.upload
);

export default routes;
