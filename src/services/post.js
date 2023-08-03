import { prisma } from "../db/prisma";

export const createPost = async (id, { content }, image) => {
  try {
    const post = await prisma.post.create({
      data: {
        content,
        author: {
          connect: {
            id,
          },
        },
        imgSource: image,
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
      orderBy: {
        id: "desc", // Ordenar por data de criação de forma decrescente
      },
      select: {
        id: true,
        createdAt: true,
        imgSource: true,
        content: true,
        author: {
          select: {
            id: true,
            name: true,
            profilePictureUrl: true,
          },
        },
        Comment: {
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
        },
        Like: {
          select: {
            id: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
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
