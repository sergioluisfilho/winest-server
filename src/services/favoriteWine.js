import { prisma } from "../db/prisma";

export const favorites = async (id) => {
  try {
    const favoriteWines = await prisma.favoriteWine.findMany({
      where: {
        userId: id,
      },
    });

    return {
      status: 200,
      data: { favoriteWines },
    };
  } catch (error) {
    console.error("Ocorreu um erro:", error);
    return {
      status: 500,
      data: error,
    };
  }
};

export const favorite = async (wineId, userId) => {
  try {
    const favoriteWine = await prisma.favoriteWine.create({
      data: {
        wineId: +wineId,
        userId,
      },
    });

    return {
      status: 201,
      data: { favoriteWine },
    };
  } catch (error) {
    console.error("Ocorreu um erro:", error);
    return {
      status: 500,
      data: error,
    };
  }
};

export const unfavorite = async (wineId, userId) => {
  try {
    const favoriteWine = await prisma.favoriteWine.delete({
      where: {
        userId_wineId: {
          wineId: +wineId,
          userId,
        },
      },
    });

    return {
      status: 200,
      data: { favoriteWine },
    };
  } catch (error) {
    console.error("Ocorreu um erro:", error);
    return {
      status: 500,
      data: error,
    };
  }
};
