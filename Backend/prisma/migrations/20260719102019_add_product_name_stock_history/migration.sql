/*
  Warnings:

  - Added the required column `productName` to the `StockHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `StockHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `stockhistory` ADD COLUMN `productName` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
