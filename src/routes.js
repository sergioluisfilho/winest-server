import { Router, response } from "express";
import RegisterController from "./controllers/RegisterController";
import LikeController from "./controllers/LikeController";
import LoginController from "./controllers/LoginController";
import PostController from "./controllers/PostController";
import CommentController from "./controllers/CommentController";
// import ProfileController from "./controllers/ProfileController";
import NotificationController from "./controllers/NotificationController";

import { prisma } from "./db/prisma";

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

routes.get("/chats", authorize, async (req, res) => {
  const messages = await prisma.chat.findMany({
    where: {
      participants: {
        some: {
          id: req.user.id,
        },
      },
    },
    select: {
      id: true,
      createdAt: true,
      participants: true,
    },
  });

  return res.status(200).json(messages);
});

routes.get("/chats/:id", authorize, async (req, res) => {
  const messages = await prisma.chat.findFirst({
    where: {
      id: +req.params.id,
    },
    select: {
      id: true,
      createdAt: true,
      messages: true,
      participants: true,
    },
  });

  return res.status(200).json(messages);
});

routes.post("/message/:id", authorize, async (req, res) => {
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
              id: req.user.id,
            },
          },
        },
        {
          participants: {
            some: {
              id: +req.params.id,
            },
          },
        },
      ],
    },
  });

  if (chat.length === 0) {
    // se não houver, cria um chat novo entre esses dois usuários
    chat = await prisma.chat.create({
      data: {
        participants: {
          connect: [
            { id: req.user.id }, // ID do primeiro usuário
            { id: +req.params.id }, // ID do segundo usuário
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
      senderId: req.user.id,
      chatsId: chatId,
    },
  });

  return res.status(200).send(message);
});

routes.post("/upload", upload.single("image"), async (req, res) => {
  return res.send();
});

export default routes;
