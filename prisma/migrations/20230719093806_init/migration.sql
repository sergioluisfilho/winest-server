/*
  Warnings:

  - You are about to drop the column `image` on the `Wine` table. All the data in the column will be lost.
  - You are about to drop the column `labels` on the `Wine` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Wine` table. All the data in the column will be lost.
  - You are about to drop the column `priceAverage` on the `Wine` table. All the data in the column will be lost.
  - Added the required column `country` to the `Wine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `designation` to the `Wine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `points` to the `Wine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Wine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `Wine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region1` to the `Wine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region2` to the `Wine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tasterName` to the `Wine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tasterTwitterHandle` to the `Wine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Wine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variety` to the `Wine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `winery` to the `Wine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Wine" DROP COLUMN "image",
DROP COLUMN "labels",
DROP COLUMN "name",
DROP COLUMN "priceAverage",
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "designation" TEXT NOT NULL,
ADD COLUMN     "points" TEXT NOT NULL,
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "province" TEXT NOT NULL,
ADD COLUMN     "region1" TEXT NOT NULL,
ADD COLUMN     "region2" TEXT NOT NULL,
ADD COLUMN     "tasterName" TEXT NOT NULL,
ADD COLUMN     "tasterTwitterHandle" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "variety" TEXT NOT NULL,
ADD COLUMN     "winery" TEXT NOT NULL;
