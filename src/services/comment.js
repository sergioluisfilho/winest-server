import { prisma } from "../db/prisma";

export const seeComments = async (postId) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: +postId,
      },
      select: {
        id: true,
        createdAt: true,
        content: true,
        postId: true,
        userId: true,
        User: {
          select: {
            id: true,
            name: true,
            profilePictureUrl: true,
          },
        },
      },
    });

    return {
      status: 200,
      data: { comments },
    };
  } catch (error) {
    console.error("Ocorreu um erro:", error);
    return {
      status: 500,
      data: error,
    };
  }
};

export const createComment = async (content, postId, userId) => {
  try {
    const comment = await prisma.comment.create({
      data: {
        postId: +postId,
        userId,
        content,
      },
    });

    return {
      status: 201,
      data: { comment },
    };
  } catch (error) {
    console.error("Ocorreu um erro:", error);
    return {
      status: 500,
      data: error,
    };
  }
};
