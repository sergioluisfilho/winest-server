import { prisma } from "../db/prisma";

export const getWines = async (offset, limit, search) => {
  try {
    let whereCondition = {
      AND: [],
    };
    if (search) {
      whereCondition.AND.push({
        title: { contains: search },
      });
    }
    // Do the same thing for any param you want to filter/search
    const wines = await prisma.wine.findMany({
      where: {
        title: { contains: search },
      },
      skip: +offset,
      take: +limit,
    });
    return {
      status: 200,
      data: wines,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      data: error.message,
    };
  }
};

export const getWine = async (id) => {
  try {
    const wine = await prisma.wine.findFirst({
      where: {
        id: +id,
      },
    });
    return {
      status: 200,
      data: wine,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      data: error,
    };
  }
};
