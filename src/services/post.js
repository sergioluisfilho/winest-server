import { prisma } from "../db/prisma";

export const createPost = async ({ content, authorId, imgSource }) => {
  try {
    const post = await prisma.post.create({
      data: {
        content,
        author: {
          connect: {
            id: authorId,
          },
        },
        imgSource,
      },
    });

    return {
      status: 201,
      data: { post },
    };
  } catch (error) {
    console.error("Ocorreu um erro:", error);
    return {
      status: 500,
      data: error,
    };
  }
};

export const listPosts = async ({ offset, limit }) => {
  try {
    const posts = await prisma.post.findMany({
      skip: +offset,
      take: +limit,
    });

    return {
      status: 200,
      data: { posts },
    };
  } catch (error) {
    console.error("Ocorreu um erro:", error);
    return {
      status: 500,
      data: error,
    };
  }
};
