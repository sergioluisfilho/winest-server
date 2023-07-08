import { prisma } from "../db/prisma";

export const createUser = async ({ name, email, password, phone }) => {
  const user = await prisma.user.create({
    data: { name, email, password, phone },
  });

  return user;
};
