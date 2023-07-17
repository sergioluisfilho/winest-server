import { Router, response } from "express";
import RegisterController from "./controllers/RegisterController";
import LikeController from "./controllers/LikeController";
import LoginController from "./controllers/LoginController";
import PostController from "./controllers/PostController";
import CommentController from "./controllers/CommentController";
import ChatController from "./controllers/ChatController";
import NotificationController from "./controllers/NotificationController";
// import ProfileController from "./controllers/ProfileController";

import { prisma } from "./db/prisma";
import { handleSendMessage } from "./utils/messageEmitter";

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
routes.get("/chats", authorize, ChatController.show);
routes.get("/chats/:id", authorize, ChatController.index);

routes.post("/message/:id", authorize, async (req, res) => {
  const senderId = req.user.id;
  const destinataryId = parseInt(req.params.id);
  let chat;
  chat = await prisma.chat.findFirst({
    // Verifica se há um chat entre o usuario que faz a request e o receptor da mensagem
    select: {
      id: true,
      createdAt: true,
      participants: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    where: {
      AND: [
        {
          participants: {
            some: {
              id: senderId,
            },
          },
        },
        {
          participants: {
            some: {
              id: destinataryId,
            },
          },
        },
      ],
    },
  });

  if (!chat || chat.length === 0) {
    // se não houver, cria um chat novo entre esses dois usuários
    chat = await prisma.chat.create({
      data: {
        participants: {
          connect: [
            { id: senderId }, // ID do primeiro usuário
            { id: destinataryId }, // ID do segundo usuário
          ],
        },
      },
      include: {
        participants: true,
      },
    });
  }

  console.log(chat); // usar o id para inserir a mensagem

  const chatId = chat.id;

  const message = await prisma.message.create({
    data: {
      text: req.body.text,
      senderId,
      chatsId: chatId,
    },
  });

  handleSendMessage(destinataryId, senderId, message);

  return res.status(200).send(message);
});

routes.post("/upload", upload.single("image"), async (req, res) => {
  return res.send();
});

export default routes;
