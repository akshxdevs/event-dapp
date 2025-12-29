-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('Active', 'Open', 'Closed', 'Ended', 'Postponed', 'On_Hold');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "eventStaus" "EventStatus";
