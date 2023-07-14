/*
  Warnings:

  - Made the column `chatsId` on table `Message` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_chatsId_fkey";

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "chatsId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatsId_fkey" FOREIGN KEY ("chatsId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
