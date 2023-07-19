import { prisma } from "../db/prisma";

export const sendMessage = async (senderId, destinataryId, text) => {
  try {
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
        text: text,
        senderId,
        chatsId: chatId,
      },
    });
    return {
      status: 200,
      data: message,
    };
  } catch (error) {
    console.error("Ocorreu um erro:", error);
    return {
      status: 500,
      data: error,
    };
  }
};
