/*
  Warnings:

  - Made the column `harga` on table `produk` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `produk` MODIFY `harga` INTEGER NOT NULL;
