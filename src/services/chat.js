import { prisma } from "../db/prisma";

export const getChats = async (senderId) => {
  try {
    const messages = await prisma.chat.findMany({
      where: {
        participants: {
          some: {
            id: senderId,
          },
        },
      },
      select: {
        id: true,
        createdAt: true,
        participants: true,
      },
    });

    return {
      status: 200,
      data: { messages },
    };
  } catch (error) {
    console.error("Ocorreu um erro:", error);
    return {
      status: 500,
      data: error,
    };
  }
};

export const getChatData = async (chatId) => {
  try {
    const messages = await prisma.chat.findFirst({
      where: {
        id: chatId,
      },
      select: {
        id: true,
        createdAt: true,
        messages: true,
        participants: true,
      },
    });
    return {
      status: 200,
      data: { messages },
    };
  } catch (error) {
    console.error("Ocorreu um erro:", error);
    return {
      status: 500,
      data: error,
    };
  }
};
