import { prisma } from "../db/prisma";

export const searchUsers = async (term) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [{ email: { contains: term } }, { name: { contains: term } }],
      },
    });

    return {
      status: 200,
      data: users,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      data: error,
    };
  }
};
