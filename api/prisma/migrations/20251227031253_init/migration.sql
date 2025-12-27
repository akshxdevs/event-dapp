/*
  Warnings:

  - Changed the type of `eventCategory` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EventCategory" AS ENUM ('Tech', 'Ai', 'Crypto', 'Wellness', 'Food_Drink', 'Arts_Culture', 'Fitness', 'Climate');

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "eventCategory",
ADD COLUMN     "eventCategory" "EventCategory" NOT NULL;
