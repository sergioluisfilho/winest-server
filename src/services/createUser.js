import { prisma } from "../db/prisma";

export const createUser = async ({ name, email, password, phone }) => {
  try {
    const userId = await prisma.user.create({
      data: { name, email, password, phone },
    });

    return {
      status: 201,
      data: { userId },
    };
  } catch (error) {
    console.error("Ocorreu um erro:", error);
    return {
      status: 500,
      data: error,
    };
  }
};
