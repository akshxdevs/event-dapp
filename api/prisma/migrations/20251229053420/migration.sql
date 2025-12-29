/*
  Warnings:

  - You are about to drop the column `eventStaus` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "eventStaus",
ADD COLUMN     "eventStatus" "EventStatus";
