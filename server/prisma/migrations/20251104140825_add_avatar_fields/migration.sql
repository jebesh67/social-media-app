/*
  Warnings:

  - You are about to drop the column `avatar` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatar",
ADD COLUMN     "avatarPublicId" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "avatarUrl" TEXT NOT NULL DEFAULT '/assets/user-profile/defaultProfile.jpg';
