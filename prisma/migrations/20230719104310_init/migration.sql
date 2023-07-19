/*
  Warnings:

  - You are about to drop the column `favoriteWines` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "favoriteWines";

-- CreateTable
CREATE TABLE "FavoriteWine" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "wineId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FavoriteWine_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteWine_userId_wineId_key" ON "FavoriteWine"("userId", "wineId");

-- AddForeignKey
ALTER TABLE "FavoriteWine" ADD CONSTRAINT "FavoriteWine_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteWine" ADD CONSTRAINT "FavoriteWine_wineId_fkey" FOREIGN KEY ("wineId") REFERENCES "Wine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
