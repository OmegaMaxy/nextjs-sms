/*
  Warnings:

  - You are about to drop the column `code` on the `Teacher` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Teacher_code_key` ON `Teacher`;

-- AlterTable
ALTER TABLE `Teacher` DROP COLUMN `code`;
