/*
  Warnings:

  - Added the required column `staffId` to the `NewsPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Course` MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `NewsPost` ADD COLUMN `staffId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Subject` MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('none', 'admin') NULL DEFAULT 'none';

-- AddForeignKey
ALTER TABLE `NewsPost` ADD CONSTRAINT `NewsPost_staffId_fkey` FOREIGN KEY (`staffId`) REFERENCES `Staff`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
