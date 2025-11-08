-- CreateEnum
CREATE TYPE "RequestType" AS ENUM ('SUM', 'MULTIPLY');

-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "type" "RequestType" NOT NULL,
    "a" INTEGER NOT NULL,
    "b" INTEGER NOT NULL,
    "result" INTEGER NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);
