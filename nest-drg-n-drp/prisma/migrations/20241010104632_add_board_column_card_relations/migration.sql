/*
  Warnings:

  - A unique constraint covering the columns `[columnId,position]` on the table `Card` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[boardId,position]` on the table `Column` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `columnId` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `boardId` to the `Column` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `Column` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "name" VARCHAR(100) NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "columnId" TEXT NOT NULL,
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "position" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Column" ADD COLUMN     "boardId" TEXT NOT NULL,
ADD COLUMN     "position" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Card_columnId_position_key" ON "Card"("columnId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "Column_boardId_position_key" ON "Column"("boardId", "position");

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Column" ADD CONSTRAINT "Column_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "Column"("id") ON DELETE CASCADE ON UPDATE CASCADE;
