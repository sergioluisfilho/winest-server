import { prisma } from "../db/prisma";

export const getNotifications = async (id) => {
  try {
    const notifications = await prisma.notification.findMany({
      select: {
        destinataryId: true,
        title: true,
        description: true,
        type: true,
        createdAt: true,
        isRead: true,
      },
      where: {
        destinataryId: id,
      },
    });

    return {
      status: 200,
      data: { notifications },
    };
  } catch (error) {
    console.error("Ocorreu um erro:", error);
    return {
      status: 500,
      data: error,
    };
  }
};

export const createNotification = async ({
  title,
  description,
  type,
  destinataryId,
}) => {
  try {
    const notification = await prisma.notification.create({
      data: {
        title,
        description,
        type,
        destinatary: {
          connect: {
            id: destinataryId,
          },
        },
        isRead: false,
      },
    });

    return {
      status: 201,
      data: { notification },
    };
  } catch (error) {
    console.error("Ocorreu um erro:", error);
    return {
      status: 500,
      data: error,
    };
  }
};

export const updateNotification = async (id) => {
  try {
    const notification = await prisma.notification.update({
      data: {
        isRead: true,
      },
      where: {
        id: +id,
      },
    });

    return {
      status: 201,
      data: { notification },
    };
  } catch (error) {
    console.error("Ocorreu um erro:", error);
    return {
      status: 500,
      data: error,
    };
  }
};
