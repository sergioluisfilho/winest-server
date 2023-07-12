import { prisma } from "../db/prisma";

export const likePost = async (postId, id) => {
  try {
    const likePost = await prisma.like.create({
      data: {
        postId: +postId,
        userId: id,
      },
    });

    return {
      status: 201,
      data: { likePost },
    };
  } catch (error) {
    console.error("Ocorreu um erro:", error);
    return {
      status: 500,
      data: error,
    };
  }
};

export const unLikePost = async (postId, userId) => {
  try {
    const likePost = await prisma.like.delete({
      where: {
        postId_userId: {
          postId: +postId,
          userId: userId,
        },
      },
    });

    return {
      status: 201,
      data: { likePost },
    };
  } catch (error) {
    console.error("Ocorreu um erro:", error);
    return {
      status: 500,
      data: error,
    };
  }
};
