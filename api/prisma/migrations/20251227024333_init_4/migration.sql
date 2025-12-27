/*
  Warnings:

  - Added the required column `eventCategory` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "eventCategory" TEXT NOT NULL;
