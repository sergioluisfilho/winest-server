import { prisma } from "../db/prisma";

export const getProfile = async (id) => {
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

export const updateProfile = async (userId, body) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: body,
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
