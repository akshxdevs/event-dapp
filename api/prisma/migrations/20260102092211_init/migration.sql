-- CreateEnum
CREATE TYPE "ResponseStatus" AS ENUM ('PAID', 'NOT_PROCESSED', 'FAILED', 'REFUND_INTIALIZED');

-- CreateTable
CREATE TABLE "Response" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "responseStatus" "ResponseStatus" NOT NULL,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("id")
);
