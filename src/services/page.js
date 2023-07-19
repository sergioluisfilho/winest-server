import { prisma } from "../db/prisma";

export const getPage = async (id) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        birthday: true,
        phone: true,
        bio: true,
        profilePictureUrl: true,
        Post: true,
      },
    });
    return {
      status: 200,
      data: user,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      data: error,
    };
  }
};
