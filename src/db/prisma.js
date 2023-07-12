import { PrismaClient, LogLevel } from "@prisma/client";

export const prisma = new PrismaClient({
  log: [
    {
      emit: "stdout", // Saída para o console
      level: "query",
    },
    // Caso queira salvar as queries em um arquivo de log
    // {
    //   emit: 'file',
    //   level: LogLevel.Query,
    //   path: './prisma.log',
    // },
  ],
});
