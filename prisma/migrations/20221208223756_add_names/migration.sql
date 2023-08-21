/*
  Warnings:

  - Added the required column `firstname` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Student` ADD COLUMN `firstname` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastname` VARCHAR(191) NOT NULL;
