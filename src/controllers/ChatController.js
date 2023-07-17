import { prisma } from "../db/prisma";

class ChatController {
  static async show(req, res) {
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
  }
  static async index(req, res) {
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
  }
}

export default ChatController;
