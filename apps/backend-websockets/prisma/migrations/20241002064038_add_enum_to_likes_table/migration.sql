/*
  Warnings:

  - You are about to drop the column `likeDate` on the `Likes` table. All the data in the column will be lost.
  - Added the required column `action` to the `Likes` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Action" AS ENUM ('Like', 'Dislike');

-- AlterTable
ALTER TABLE "Likes" DROP COLUMN "likeDate",
ADD COLUMN     "action" "Action" NOT NULL,
ADD COLUMN     "actionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
