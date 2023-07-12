import { prisma } from "../db/prisma";

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
