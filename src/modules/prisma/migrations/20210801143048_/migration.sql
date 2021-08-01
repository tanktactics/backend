-- CreateEnum
CREATE TYPE "State" AS ENUM ('ongoing', 'ended');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "gameId" TEXT;

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "boardWidth" INTEGER NOT NULL,
    "boardHeight" INTEGER NOT NULL,
    "state" "State" NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "range" INTEGER NOT NULL,
    "health" INTEGER NOT NULL DEFAULT 3,
    "kills" INTEGER NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player.username_unique" ON "Player"("username");

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE SET NULL ON UPDATE CASCADE;
