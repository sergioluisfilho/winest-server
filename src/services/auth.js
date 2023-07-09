import { prisma } from "../db/prisma";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/generateToken";

export const login = async ({ email, password }) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
        password,
      },
      select: {
        id: true,
        name: true,
        email: true,
        birthday: true,
        phone: true,
        bio: true,
        password: false, // Exclui o campo de senha
        favoriteWines: true,
      },
    });

    if (!user)
      return {
        status: 401,
        data: { message: "Invalid credentials" },
      };

    return {
      status: 200,
      data: {
        user,
        jwt: generateToken(user),
      },
    };
  } catch (error) {
    console.error("Ocorreu um erro:", error);
    return {
      status: 500,
      data: error,
    };
  }
};
